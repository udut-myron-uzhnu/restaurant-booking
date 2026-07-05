import Link from "next/link";
import Image from "next/image";
import TableCard from "@/components/TableCard";

const popularTables = [
  { id: 1, number: 1, capacity: 2, location: "main_hall", description: "Затишний стіл біля вікна.", available: true },
  { id: 5, number: 5, capacity: 6, location: "terrace", description: "Великий стіл на терасі для компанії.", available: true },
  { id: 8, number: 8, capacity: 6, location: "vip", description: "Окремий VIP-стіл для компанії.", available: true },
];

export default function Home() {
  return (
    <div>
      {/* Тиждень 13: hero з оптимізованим зображенням next/image */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
          alt="Зал ресторану «Веранда» зі столами"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-800/60" />
        <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Ресторан «Веранда»</h1>
          <p className="text-xl mb-8 text-slate-200">
            Бронювання столів онлайн — оберіть зал, дату та час.
          </p>
          <Link
            href="/tables"
            className="inline-block bg-white text-slate-800 px-8 py-3 rounded font-semibold hover:bg-slate-100 transition"
          >
            Переглянути столи
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Популярні столи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularTables.map(table => (
              <TableCard key={table.id} {...table} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
