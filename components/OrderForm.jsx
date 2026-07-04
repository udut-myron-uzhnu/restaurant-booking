// Тиждень 12: OrderForm на RHF + useFieldArray + Zod resolver + Sonner
"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { z } from "zod";
import FormField from "@/components/forms/FormField";

const ZONES = { main_hall: "Основна зала", terrace: "Тераса", vip: "VIP", bar: "Бар" };

// Клієнтська схема форми (для field-level помилок); сувору перевірку
// ObjectId та місткості виконує сервер у createOrderSchema.
const orderFormSchema = z.object({
  user: z.string().optional(),
  items: z
    .array(
      z.object({
        table: z.string().min(1, "Оберіть стіл"),
        guestCount: z
          .number({ invalid_type_error: "Вкажіть кількість" })
          .int()
          .min(1, "Мінімум 1")
          .max(20, "Максимум 20"),
      })
    )
    .min(1, "Додайте хоча б один стіл"),
  notes: z.string().max(300, "Максимум 300 символів").optional(),
});

export default function OrderForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [tables, setTables] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingTables, setLoadingTables] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      user: "",
      items: [{ table: "", guestCount: 1 }],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  useEffect(() => {
    fetch("/api/tables")
      .then((res) => res.json())
      .then((data) => {
        setTables((data.tables || []).filter((t) => t.isAvailable));
        setLoadingTables(false);
      })
      .catch(() => setLoadingTables(false));
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
      });
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin && session?.user?.id) setValue("user", session.user.id);
  }, [isAdmin, session?.user?.id, setValue]);

  // Live-сума гостей через watch
  const watchedItems = watch("items");
  const totalGuests = useMemo(
    () => (watchedItems || []).reduce((sum, it) => sum + Number(it?.guestCount || 0), 0),
    [watchedItems]
  );

  const onSubmit = async (data) => {
    const payload = {
      items: data.items,
      notes: data.notes,
      ...(isAdmin && data.user ? { user: data.user } : {}),
    };
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.errors?.join(", ") || body.error || "Не вдалося створити");
      toast.success("Замовлення створено");
      router.push(`/dashboard/orders/${body._id}`);
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (loadingTables) {
    return <div className="bg-white rounded-lg shadow p-8 text-gray-500">Завантаження столів...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      {isAdmin && (
        <FormField label="Замовник" required error={errors.user?.message}>
          <select {...register("user")} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800">
            <option value="">Оберіть користувача</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
            ))}
          </select>
        </FormField>
      )}

      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-gray-700 font-bold">Столи *</label>
          <button
            type="button"
            onClick={() => append({ table: "", guestCount: 1 })}
            className="text-slate-800 hover:underline text-sm font-medium cursor-pointer"
          >
            + Додати стіл
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => {
            const itemErrors = errors.items?.[index];
            return (
              <div key={field.id} className="flex gap-3 items-start bg-gray-50 p-3 rounded border">
                <div className="flex-1">
                  <select
                    {...register(`items.${index}.table`)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-slate-800"
                  >
                    <option value="">Оберіть стіл</option>
                    {tables.map((t) => (
                      <option key={t._id} value={t._id}>
                        Стіл №{t.number} — {ZONES[t.location]}, до {t.capacity} осіб
                      </option>
                    ))}
                  </select>
                  {itemErrors?.table && (
                    <p className="text-xs text-red-600 mt-1">{itemErrors.table.message}</p>
                  )}
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    min={1}
                    max={20}
                    {...register(`items.${index}.guestCount`, { valueAsNumber: true })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-slate-800"
                  />
                  {itemErrors?.guestCount && (
                    <p className="text-xs text-red-600 mt-1">{itemErrors.guestCount.message}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="text-red-600 hover:text-red-800 disabled:text-gray-300 text-xl px-2 cursor-pointer"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
        {errors.items?.message && (
          <p className="text-sm text-red-600 mt-2">{errors.items.message}</p>
        )}
      </div>

      <FormField label="Коментар" error={errors.notes?.message}>
        <textarea
          rows="3"
          maxLength={300}
          {...register("notes")}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
        />
      </FormField>

      {totalGuests > 0 && (
        <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded">
          <strong>Гостей усього:</strong>{" "}
          <span className="text-xl font-bold text-slate-800">{totalGuests}</span>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-800 text-white px-6 py-3 rounded hover:bg-slate-700 font-bold disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Створення..." : "Створити замовлення"}
        </button>
        <Link href="/dashboard/orders" className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-medium">
          Скасувати
        </Link>
      </div>
    </form>
  );
}
