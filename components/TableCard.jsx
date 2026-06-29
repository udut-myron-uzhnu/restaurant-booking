import Link from "next/link";
import { zones } from "@/lib/tables";
import FavoriteButton from "./FavoriteButton";

export default function TableCard({ id, number, capacity, location, description, available = true }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${!available ? "opacity-60" : ""}`}>
      <div className="h-24 bg-slate-100 flex items-center justify-center">
        <span className="text-2xl font-bold text-slate-700">Стіл №{number}</span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{zones[location]}</h3>
          <div className="flex items-center gap-2">
            {id && <FavoriteButton tableId={id} />}
            {available ? (
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Вільний</span>
            ) : (
              <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600">Зайнятий</span>
            )}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-slate-700 font-semibold text-sm">На {capacity} осіб</span>
          {id && (
            <Link href={`/tables/${id}`} className="text-sm text-slate-700 hover:text-slate-900 font-medium">
              Детальніше →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
