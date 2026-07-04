// Тиждень 12: Редагування замовлення на RHF + Zod resolver + Sonner
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { updateOrderSchema } from "@/lib/validations/order";
import FormField from "@/components/forms/FormField";

const STATUSES = [
  { value: "pending", label: "Очікує" },
  { value: "confirmed", label: "Підтверджено" },
  { value: "seated", label: "Розсаджено" },
  { value: "completed", label: "Виконано" },
  { value: "cancelled", label: "Скасовано" },
];

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status: sessionStatus } = useSession();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateOrderSchema),
    defaultValues: { status: "pending", notes: "" },
  });

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLoading(false);
          return;
        }
        setOrder(data);
        reset({ status: data.status, notes: data.notes || "" });
        setLoading(false);
      });
  }, [params.id, reset]);

  if (sessionStatus === "loading" || loading) {
    return <div className="text-gray-500">Завантаження...</div>;
  }
  if (session?.user?.role !== "admin") {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
        Редагувати замовлення може лише адміністратор.
      </div>
    );
  }
  if (!order) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
        Замовлення не знайдено
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/orders/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.errors?.join(", ") || body.error || "Помилка");
      toast.success("Замовлення оновлено");
      router.push(`/dashboard/orders/${params.id}`);
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href={`/dashboard/orders/${params.id}`} className="text-slate-800 hover:underline text-sm">
          &larr; До замовлення
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Редагування замовлення</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow space-y-5">
        <FormField label="Статус" required error={errors.status?.message}>
          <select {...register("status")} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800">
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Коментар" error={errors.notes?.message}>
          <textarea
            rows="3"
            maxLength={300}
            {...register("notes")}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
          />
        </FormField>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-800 text-white px-6 py-3 rounded hover:bg-slate-700 font-bold disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Збереження..." : "Зберегти"}
        </button>
      </form>
    </div>
  );
}
