import { NextResponse } from "next/server";
import { tables, zones, addTable } from "@/lib/tables";

// GET /api/tables — list with optional zone filter and search
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const search = searchParams.get("search");

  let result = [...tables];

  if (location && location !== "Всі") {
    result = result.filter((table) => table.location === location);
  }

  if (search) {
    result = result.filter(
      (table) =>
        String(table.number).includes(search) ||
        zones[table.location].toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json(result);
}

// POST /api/tables — create a table
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.number || !body.capacity || !body.location) {
      return NextResponse.json(
        { error: "Поля number, capacity та location є обов'язковими" },
        { status: 400 }
      );
    }
    if (Number(body.capacity) <= 0) {
      return NextResponse.json(
        { error: "Місткість має бути додатнім числом" },
        { status: 400 }
      );
    }
    if (tables.some((table) => table.number === Number(body.number))) {
      return NextResponse.json(
        { error: "Стіл з таким номером уже існує" },
        { status: 400 }
      );
    }

    const newTable = addTable(body);
    return NextResponse.json(newTable, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Невалідний JSON" }, { status: 400 });
  }
}
