import dbConnect from "./db";
import Table from "./models/Table";
import Order from "./models/Order";

export async function getTableStats() {
  await dbConnect();
  const tables = await Table.find();
  const total = tables.length;
  const available = tables.filter((table) => table.isAvailable).length;
  const unavailable = total - available;
  const zones = [...new Set(tables.map((table) => table.location))];
  const avgCapacity =
    total > 0
      ? Math.round(tables.reduce((sum, table) => sum + table.capacity, 0) / total)
      : 0;
  return { total, available, unavailable, zonesCount: zones.length, avgCapacity };
}

// Тиждень 11: агрегована статистика замовлень (лише для адміністратора)
export async function getOrderStats() {
  await dbConnect();
  const [total, pending, completed] = await Promise.all([
    Order.countDocuments({}),
    Order.countDocuments({ status: "pending" }),
    Order.countDocuments({ status: "completed" }),
  ]);
  return { total, pending, completed };
}
