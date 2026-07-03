import dbConnect from "@/lib/db";
import Table from "@/lib/models/Table";
import { authorize } from "@/lib/authorize";
import { createTableSchema } from "@/lib/validations/table";
import { sanitizeObject } from "@/lib/sanitize";

// GET /api/tables  (?location=terrace, ?search=...) — публічний
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

// POST /api/tables — тільки admin
export async function POST(request) {
  const { error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  try {
    const data = await request.json();

    // Валідація через zod
    const result = createTableSchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message);
      return Response.json({ errors: messages }, { status: 400 });
    }

    // Санітизація вмісту рядкових полів
    const sanitized = sanitizeObject(result.data);
    const table = await Table.create(sanitized);
    return Response.json(table, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ errors: ["Стіл з таким номером уже існує"] }, { status: 400 });
    }
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Невалідний JSON у тілі запиту" }, { status: 400 });
    }
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
