import Link from "next/link";
import { notFound } from "next/navigation";
import { getTableById, zones } from "@/lib/tables";

export default async function TableDetailPage({ params }) {
  const { id } = await params;
  const table = getTableById(id);

  if (!table) {
    notFound();
  }

  return (
    <div>
      <Link href="/dashboard/tables" className="text-slate-700 hover:underline inline-block mb-4">
        ← Назад до списку
      </Link>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Стіл №{table.number}</h1>
          <div className="space-x-2">
            <button className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800">Редагувати</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Видалити</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
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
        <div className="mt-6">
          <h3 className="text-gray-500 text-sm font-bold mb-2">Опис</h3>
          <p className="text-gray-700">{table.description}</p>
        </div>
      </div>
    </div>
  );
}
