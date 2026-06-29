import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-600 mb-6">Користувача не знайдено</h2>
        <p className="text-gray-500 mb-8">Користувача з таким ідентифікатором не існує.</p>
        <Link href="/demo/users/1" className="bg-slate-700 text-white px-6 py-3 rounded hover:bg-slate-800">
          До користувача №1
        </Link>
      </div>
    </div>
  );
}
