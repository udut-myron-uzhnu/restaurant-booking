import { NextResponse } from "next/server";
import { getTableById, updateTable, deleteTable } from "@/lib/tables";

// GET /api/tables/[id] — one table by id
export async function GET(request, { params }) {
  const { id } = await params;
  const table = getTableById(id);
  if (!table) {
    return NextResponse.json({ error: "Стіл не знайдено" }, { status: 404 });
  }
  return NextResponse.json(table);
}

// PUT /api/tables/[id] — update a table
export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const body = await request.json();
    if (!body.number || !body.capacity || !body.location) {
      return NextResponse.json(
        { error: "Поля number, capacity та location є обов'язковими" },
        { status: 400 }
      );
    }
    const updated = updateTable(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Стіл не знайдено" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Невалідний JSON" }, { status: 400 });
  }
}

// DELETE /api/tables/[id] — delete a table
export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = deleteTable(id);
  if (!deleted) {
    return NextResponse.json({ error: "Стіл не знайдено" }, { status: 404 });
  }
  return NextResponse.json({ message: `Стіл №${deleted.number} видалено`, deleted });
}
