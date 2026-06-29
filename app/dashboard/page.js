import { tables } from "@/lib/tables";

export const metadata = {
  title: "Панель керування",
};

export default function DashboardPage() {
  const total = tables.length;
  const free = tables.filter((table) => table.available).length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Огляд</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-500 text-sm font-bold">Усього столів</h3>
          <p className="text-4xl font-bold text-slate-800 mt-2">{total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-500 text-sm font-bold">Вільних зараз</h3>
          <p className="text-4xl font-bold text-slate-800 mt-2">{free}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-500 text-sm font-bold">Бронювань сьогодні</h3>
          <p className="text-4xl font-bold text-slate-800 mt-2">7</p>
        </div>
      </div>
    </div>
  );
}
