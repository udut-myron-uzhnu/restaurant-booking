export const metadata = {
  title: "Закешований пост",
};

export default async function CachedPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", { cache: "force-cache" });
  const post = await response.json();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Закешований пост</h1>
      <div className="bg-gray-50 border border-gray-200 p-4 rounded mb-4 text-sm text-gray-700">
        <p>У production цей пост кешується після збірки — час завантаження залишається незмінним.</p>
        <p className="mt-1">У режимі npm run dev кешування вимкнено, тому час оновлюється щоразу.</p>
      </div>
      <article className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">{post.title}</h2>
        <p className="text-gray-700">{post.body}</p>
        <p className="text-sm text-gray-500 mt-4">Завантажено: {new Date().toLocaleTimeString()}</p>
      </article>
    </div>
  );
}
