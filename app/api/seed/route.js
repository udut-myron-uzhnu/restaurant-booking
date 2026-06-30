import dbConnect from "@/lib/db";
import Table from "@/lib/models/Table";
import Reservation from "@/lib/models/Reservation";

const initialTables = [
  { number: 1, capacity: 2, location: "main_hall", description: "Затишний стіл біля вікна.", isAvailable: true },
  { number: 2, capacity: 4, location: "main_hall", description: "Стіл у центрі зали.", isAvailable: true },
  { number: 3, capacity: 4, location: "main_hall", description: "Стіл поруч із каміном.", isAvailable: false },
  { number: 4, capacity: 2, location: "terrace", description: "Стіл на терасі з краєвидом на сад.", isAvailable: true },
  { number: 5, capacity: 6, location: "terrace", description: "Великий стіл на терасі для компанії.", isAvailable: true },
  { number: 6, capacity: 2, location: "bar", description: "Місце біля барної стійки.", isAvailable: true },
  { number: 7, capacity: 3, location: "bar", description: "Високий стіл біля бару.", isAvailable: false },
  { number: 8, capacity: 6, location: "vip", description: "Окремий VIP-стіл для компанії.", isAvailable: true },
  { number: 9, capacity: 8, location: "vip", description: "Простора VIP-зона з диванами.", isAvailable: true },
  { number: 10, capacity: 4, location: "main_hall", description: "Стіл біля панорамного вікна.", isAvailable: true },
];

export async function GET() {
  try {
    await dbConnect();

    await Reservation.deleteMany({});
    await Table.deleteMany({});

    const tables = await Table.create(initialTables);

    const reservations = await Reservation.create([
      { table: tables[3]._id, guestName: "Іван Петренко", date: "2026-06-30", time: "18:00", guestCount: 2, status: "confirmed" },
      { table: tables[7]._id, guestName: "Марія Коваль", date: "2026-06-30", time: "19:30", guestCount: 5, status: "pending" },
      { table: tables[0]._id, guestName: "Олег Сидоренко", date: "2026-06-29", time: "13:00", guestCount: 2, status: "completed" },
    ]);

    return Response.json({
      message: `Базу наповнено: ${tables.length} столів, ${reservations.length} бронювань`,
      tables,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
