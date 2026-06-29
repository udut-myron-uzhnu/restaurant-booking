import Link from "next/link";
import { tables, zones } from "@/lib/tables";

export const metadata = {
  title: "Керування столами",
};

export default async function DashboardTablesPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Столи</h1>
        <Link
          href="/dashboard/tables/new"
          className="bg-slate-700 text-white px-6 py-2 rounded hover:bg-slate-800"
        >
          Додати стіл
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Номер</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Зона</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Місткість</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Статус</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Дії</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tables.map((table) => (
              <tr key={table.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Стіл №{table.number}</td>
                <td className="px-6 py-4 text-gray-700">{zones[table.location]}</td>
                <td className="px-6 py-4 text-gray-700">{table.capacity} осіб</td>
                <td className="px-6 py-4">
                  {table.available ? (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Вільний</span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600">Зайнятий</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/dashboard/tables/${table.id}`} className="text-slate-700 hover:underline">
                    Переглянути
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
