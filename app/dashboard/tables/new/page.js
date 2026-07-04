"use client";

import Link from "next/link";
import TableForm from "@/components/TableForm";

export default function NewTablePage() {
  return (
    <div>
      <Link href="/dashboard/tables" className="text-slate-800 hover:underline mb-4 inline-block">
        ← Назад до списку
      </Link>
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Додати новий стіл</h1>
        <TableForm mode="create" />
      </div>
    </div>
  );
}
