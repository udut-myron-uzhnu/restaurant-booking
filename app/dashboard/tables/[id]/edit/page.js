"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import TableForm from "@/components/TableForm";

export default function EditTablePage() {
  const { id } = useParams();
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    fetch(`/api/tables/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Стіл не знайдено");
        return res.json();
      })
      .then((data) => {
        setTable(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoadError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700">{loadError}</p>
      </div>
    );
  }

  return (
    <div>
      <Link href={`/dashboard/tables/${id}`} className="text-slate-800 hover:underline mb-4 inline-block">
        ← Назад до столу
      </Link>
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Редагувати: Стіл №{table.number}</h1>
        <TableForm mode="edit" tableId={id} initialData={table} />
      </div>
    </div>
  );
}
