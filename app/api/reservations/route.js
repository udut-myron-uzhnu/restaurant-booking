import dbConnect from "@/lib/db";
import Reservation from "@/lib/models/Reservation";

// GET /api/reservations — list with the related table populated
export async function GET() {
  await dbConnect();
  const reservations = await Reservation.find()
    .populate("table", "number location")
    .sort({ date: 1 });
  return Response.json({ count: reservations.length, reservations });
}

// POST /api/reservations
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const reservation = await Reservation.create(body);
    return Response.json(reservation, { status: 201 });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return Response.json({ errors: messages }, { status: 400 });
    }
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
