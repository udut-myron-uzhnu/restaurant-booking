export const revalidate = 10;

export const metadata = {
  title: "Пост з оновленням",
};

export default async function RevalidatedPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/2");
  const post = await response.json();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Пост з оновленням кешу</h1>
      <div className="bg-gray-50 border border-gray-200 p-4 rounded mb-4 text-sm text-gray-700">
        <p>У production цей пост оновлюється кожні 10 секунд завдяки revalidate.</p>
        <p className="mt-1">У режимі npm run dev оновлення відбувається при кожному запиті.</p>
      </div>
      <article className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">{post.title}</h2>
        <p className="text-gray-700">{post.body}</p>
        <p className="text-sm text-gray-500 mt-4">Завантажено: {new Date().toLocaleTimeString()}</p>
      </article>
    </div>
  );
}
