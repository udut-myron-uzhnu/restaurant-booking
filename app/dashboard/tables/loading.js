import { TableSkeleton } from "@/components/skeletons/PostSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
      </div>
      <TableSkeleton rows={10} />
    </div>
  );
}
