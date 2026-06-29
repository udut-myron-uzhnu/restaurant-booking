import Link from "next/link";
import { notFound } from "next/navigation";
import { getTableById, zones } from "@/lib/tables";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const table = getTableById(id);
  if (!table) return { title: "Стіл не знайдено" };
  return { title: `Стіл №${table.number}`, description: table.description };
}

export default async function TablePage({ params }) {
  const { id } = await params;
  const table = getTableById(id);

  if (!table) {
    notFound();
  }

  return (
    <div>
      <section className="bg-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/tables" className="text-slate-300 hover:text-white">
            ← Назад до столів
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <h1 className="text-4xl font-bold">Стіл №{table.number}</h1>
            <FavoriteButton tableId={table.id} />
          </div>
          <span className="text-slate-300">{zones[table.location]}</span>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-gray-500 text-sm font-bold mb-1">Зона</h3>
                <p className="text-lg text-gray-900">{zones[table.location]}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-bold mb-1">Місткість</h3>
                <p className="text-lg text-gray-900">{table.capacity} осіб</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-bold mb-1">Статус</h3>
                {table.available ? (
                  <span className="text-green-700 font-semibold">Вільний</span>
                ) : (
                  <span className="text-gray-500 font-semibold">Зайнятий</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-bold mb-2">Опис</h3>
              <p className="text-gray-700 leading-relaxed">{table.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
