export const dynamic = "force-dynamic";

export default async function ErrorTestPage() {
  const shouldFail = Math.random() > 0.5;
  if (shouldFail) {
    throw new Error("Випадкова помилка для перевірки error.js");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gray-50 border border-gray-200 p-6 rounded">
        <h1 className="text-2xl font-bold text-gray-900">Успіх — помилки не сталося</h1>
        <p className="text-gray-600 mt-2">Оновіть сторінку: з імовірністю 50% станеться помилка.</p>
      </div>
    </div>
  );
}
