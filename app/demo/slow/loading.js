export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-slate-700 mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Завантаження...</p>
      </div>
    </div>
  );
}
