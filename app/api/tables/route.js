import dbConnect from "@/lib/db";
import Table from "@/lib/models/Table";

// GET /api/tables  (?location=terrace, ?search=...)
export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const search = searchParams.get("search");

  const filter = {};
  if (location) {
    filter.location = location;
  }
  if (search) {
    filter.description = { $regex: search, $options: "i" };
  }

  const tables = await Table.find(filter).sort({ number: 1 });
  return Response.json({ count: tables.length, tables });
}

// POST /api/tables
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const table = await Table.create(body);
    return Response.json(table, { status: 201 });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return Response.json({ errors: messages }, { status: 400 });
    }
    if (error.code === 11000) {
      return Response.json({ errors: ["Стіл з таким номером уже існує"] }, { status: 400 });
    }
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
