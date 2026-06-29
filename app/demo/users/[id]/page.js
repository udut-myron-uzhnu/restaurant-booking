import { notFound } from "next/navigation";

const users = {
  "1": { id: 1, name: "Іван Петренко" },
  "2": { id: 2, name: "Марія Коваль" },
  "3": { id: 3, name: "Олег Сидоренко" },
};

export default async function UserPage({ params }) {
  const { id } = await params;
  const user = users[id];

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Користувач: {user.name}</h1>
      <p className="text-gray-600 mt-2">Ідентифікатор: {user.id}</p>
    </div>
  );
}
