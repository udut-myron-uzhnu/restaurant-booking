import dbConnect from "@/lib/db";
import Table from "@/lib/models/Table";

// GET /api/tables/[id]
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

// PUT /api/tables/[id]
export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;
  try {
    const body = await request.json();
    const table = await Table.findByIdAndUpdate(id, body, {
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

// DELETE /api/tables/[id]
export async function DELETE(request, { params }) {
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
