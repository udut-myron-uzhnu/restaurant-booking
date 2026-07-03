import dbConnect from "@/lib/db";
import Table from "@/lib/models/Table";
import { authorize } from "@/lib/authorize";
import { updateTableSchema } from "@/lib/validations/table";
import { sanitizeObject } from "@/lib/sanitize";

// GET /api/tables/[id] — публічний
export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;
  try {
    const table = await Table.findById(id);
    if (!table) {
      return Response.json({ error: "Стіл не знайдено" }, { status: 404 });
    }
    return Response.json(table);
  } catch (error) {
    return Response.json({ error: "Невалідний ID" }, { status: 400 });
  }
}

// PUT /api/tables/[id] — тільки admin
export async function PUT(request, { params }) {
  const { error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;
  try {
    const data = await request.json();

    // Валідація через zod
    const result = updateTableSchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message);
      return Response.json({ errors: messages }, { status: 400 });
    }

    // Санітизація та збереження лише валідованих полів
    const sanitized = sanitizeObject(result.data);
    const table = await Table.findByIdAndUpdate(id, sanitized, {
      new: true,
      runValidators: true,
    });
    if (!table) {
      return Response.json({ error: "Стіл не знайдено" }, { status: 404 });
    }
    return Response.json(table);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return Response.json({ errors: messages }, { status: 400 });
    }
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

// DELETE /api/tables/[id] — тільки admin
export async function DELETE(request, { params }) {
  const { error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;
  try {
    const table = await Table.findByIdAndDelete(id);
    if (!table) {
      return Response.json({ error: "Стіл не знайдено" }, { status: 404 });
    }
    return Response.json({ message: `Стіл №${table.number} видалено` });
  } catch (error) {
    return Response.json({ error: "Невалідний ID" }, { status: 400 });
  }
}
