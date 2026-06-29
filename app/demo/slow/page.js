export const metadata = {
  title: "Повільна сторінка",
};

export default async function SlowPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Повільна сторінка (3 секунди)</h1>
      <div className="bg-gray-50 border border-gray-200 p-4 rounded mb-6 text-gray-700">
        <p>Ця сторінка завантажується 3 секунди. Під час переходу показується індикатор завантаження.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post) => (
          <article key={post.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
