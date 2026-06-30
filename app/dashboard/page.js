import StatsCard from "@/components/StatsCard";
import { getTableStats } from "@/lib/helpers";

export const metadata = {
  title: "Панель керування",
};

export default function DashboardPage() {
  const stats = getTableStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Огляд</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Усього столів" value={stats.total} color="slate" />
        <StatsCard title="Вільних столів" value={stats.available} color="green" />
        <StatsCard title="Середня місткість" value={stats.avgCapacity} color="slate" />
      </div>
    </div>
  );
}
