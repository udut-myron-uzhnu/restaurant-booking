// Панель керування — Server Component
// Тиждень 11: статистика замовлень видна лише адміністратору
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import StatsCard from "@/components/StatsCard";
import { getTableStats, getOrderStats } from "@/lib/helpers";

export const metadata = {
  title: "Панель керування",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  // Статистику замовлень запитуємо лише для адміністратора.
  const [stats, orderStats] = await Promise.all([
    getTableStats(),
    isAdmin ? getOrderStats() : Promise.resolve(null),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Огляд</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Столи</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Усього столів" value={stats.total} color="slate" />
        <StatsCard title="Вільних столів" value={stats.available} color="green" />
        <StatsCard title="Середня місткість" value={stats.avgCapacity} color="slate" />
      </div>

      {isAdmin && orderStats && (
        <>
          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-3">Замовлення</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard title="Замовлень усього" value={orderStats.total} color="slate" />
            <StatsCard title="Очікують" value={orderStats.pending} color="red" />
            <StatsCard title="Виконано" value={orderStats.completed} color="green" />
          </div>
        </>
      )}
    </div>
  );
}
