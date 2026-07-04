// Тиждень 11: API для колекції замовлень (many-to-many через OrderItem)
// GET /api/orders — admin бачить усе, user — лише свої (+ ?status= ?table=)
// POST /api/orders — аутентифікований; user береться з session, totalGuests — з сервера
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import OrderItem from "@/lib/models/OrderItem";
import Table from "@/lib/models/Table";
import User from "@/lib/models/User"; // реєстрація моделі для populate
import { authorize } from "@/lib/authorize";
import { createOrderSchema } from "@/lib/validations/order";
import { sanitizeObject } from "@/lib/sanitize";

// Явна реєстрація моделей для populate() — інакше при hot-reload буде
// "Schema hasn't been registered for model ..."
void [User, Table, OrderItem];

export async function GET(request) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const table = searchParams.get("table");

  const filter = session.user.role === "admin" ? {} : { user: session.user.id };
  if (status) filter.status = status;

  // ?table=<id> — показати лише замовлення, що містять цей стіл
  if (table) {
    const orderIds = await OrderItem.find({ table }).distinct("order");
    filter._id = { $in: orderIds };
  }

  const orders = await Order.find(filter)
    .populate({ path: "user", select: "name email role" })
    .populate({
      path: "items",
      populate: { path: "table", select: "number capacity location isAvailable" },
    })
    .sort({ createdAt: -1 });

  return Response.json(orders);
}

export async function POST(request) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  let createdOrderId = null;
  try {
    const data = await request.json();

    const result = createOrderSchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message);
      return Response.json({ errors: messages }, { status: 400 });
    }

    const sanitized = sanitizeObject(result.data);

    // 0) Визначити користувача-власника замовлення.
    let orderUserId = session.user.id;
    if (session.user.role === "admin" && sanitized.user) {
      const targetUser = await User.findById(sanitized.user);
      if (!targetUser) {
        return Response.json({ error: "Користувача не знайдено" }, { status: 404 });
      }
      orderUserId = targetUser._id;
    }

    // 1) Підтягнути всі столи одним запитом.
    const tableIds = sanitized.items.map((i) => i.table);
    const tables = await Table.find({ _id: { $in: tableIds } });
    const tableById = new Map(tables.map((t) => [t._id.toString(), t]));

    // 2) Перевірити, що всі столи існують, доступні та вміщують гостей.
    for (const item of sanitized.items) {
      const table = tableById.get(item.table);
      if (!table) {
        return Response.json({ error: `Стіл не знайдено: ${item.table}` }, { status: 404 });
      }
      if (!table.isAvailable) {
        return Response.json(
          { error: `Стіл №${table.number} зараз недоступний` },
          { status: 409 }
        );
      }
      if (item.guestCount > table.capacity) {
        return Response.json(
          { error: `Стіл №${table.number} вміщує щонайбільше ${table.capacity} гостей` },
          { status: 409 }
        );
      }
    }

    // 3) Обчислити сумарну кількість гостей на сервері (zero trust).
    const totalGuests = sanitized.items.reduce((sum, item) => sum + item.guestCount, 0);

    // 4) Створити Order.
    const order = await Order.create({
      user: orderUserId,
      totalGuests,
      notes: sanitized.notes,
    });
    createdOrderId = order._id;

    // 5) Створити OrderItem-и пакетом (capacitySnapshot = місткість столу зараз).
    const itemsToCreate = sanitized.items.map((item) => {
      const table = tableById.get(item.table);
      return {
        order: order._id,
        table: table._id,
        guestCount: item.guestCount,
        capacitySnapshot: table.capacity,
      };
    });
    await OrderItem.insertMany(itemsToCreate);

    // 6) Повернути замовлення з populate items.table + user.
    const populated = await Order.findById(order._id)
      .populate({ path: "user", select: "name email" })
      .populate({
        path: "items",
        populate: { path: "table", select: "number capacity location isAvailable" },
      });

    return Response.json(populated, { status: 201 });
  } catch (err) {
    // Rollback: прибираємо щойно створене замовлення, якщо вставка позицій впала
    if (createdOrderId) {
      try {
        await Order.deleteOne({ _id: createdOrderId });
      } catch {
        // best-effort
      }
    }
    if (err instanceof SyntaxError) {
      return Response.json({ error: "Невалідний JSON у тілі запиту" }, { status: 400 });
    }
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
