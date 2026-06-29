import DashboardNav from "@/components/DashboardNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh-130px)]">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Панель керування</h2>
        <DashboardNav />
      </aside>
      <div className="flex-1 bg-gray-100 p-8">{children}</div>
    </div>
  );
}
