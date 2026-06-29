export const metadata = {
  title: "Пости з API",
};

export default async function PostsPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Пости з публічного API</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 9).map((post) => (
          <article key={post.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900">{post.title}</h2>
            <p className="text-gray-600 line-clamp-3">{post.body}</p>
            <div className="mt-4 text-sm text-gray-500">Пост #{post.id}, користувач {post.userId}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
