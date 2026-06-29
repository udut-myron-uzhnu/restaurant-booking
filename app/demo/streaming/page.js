import { Suspense } from "react";
import { PostSkeleton, StatSkeleton } from "@/components/skeletons/PostSkeleton";

export const metadata = {
  title: "Потокове завантаження",
};

async function FastStats() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-500 text-sm">Показник 1</h3>
        <p className="text-3xl font-bold text-slate-800">123</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-500 text-sm">Показник 2</h3>
        <p className="text-3xl font-bold text-slate-800">456</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-500 text-sm">Показник 3</h3>
        <p className="text-3xl font-bold text-slate-800">789</p>
      </div>
    </div>
  );
}

async function SlowPosts() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
  const posts = await response.json();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Повільні пости (3 секунди)</h2>
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h3>
          <p className="text-gray-600">{post.body}</p>
        </article>
      ))}
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Потокове завантаження</h1>
      <div className="bg-gray-50 border border-gray-200 p-4 rounded mb-8 text-gray-700">
        <p>Швидкі показники з'являються через 0,5 секунди, повільні пости — через 3 секунди. Контент надходить поступово.</p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-3 gap-4 mb-8">
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>
        }
      >
        <FastStats />
      </Suspense>

      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-4"></div>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        }
      >
        <SlowPosts />
      </Suspense>
    </div>
  );
}
