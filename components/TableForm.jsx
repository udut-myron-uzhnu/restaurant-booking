// Тиждень 12: TableForm на React Hook Form + Zod resolver + Sonner
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { createTableSchema } from "@/lib/validations/table";
import FormField from "@/components/forms/FormField";

const LOCATIONS = [
  { value: "main_hall", label: "Основна зала" },
  { value: "terrace", label: "Тераса" },
  { value: "vip", label: "VIP" },
  { value: "bar", label: "Бар" },
];

export default function TableForm({ mode = "create", initialData, tableId }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTableSchema),
    defaultValues: {
      number: initialData?.number ?? "",
      capacity: initialData?.capacity ?? "",
      location: initialData?.location ?? "main_hall",
      description: initialData?.description ?? "",
      isAvailable: initialData?.isAvailable ?? true,
    },
  });

  const onSubmit = async (data) => {
    const url = isEdit ? `/api/tables/${tableId}` : "/api/tables";
    const method = isEdit ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.errors?.join(", ") || body.error || "Не вдалося зберегти");
      }
      toast.success(isEdit ? "Зміни збережено" : "Стіл додано");
      router.push(isEdit ? `/dashboard/tables/${tableId}` : "/dashboard/tables");
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Номер столу" required error={errors.number?.message}>
          <input
            type="number"
            min="1"
            {...register("number", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800 ${
              errors.number ? "border-red-500" : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField label="Місткість" required error={errors.capacity?.message}>
          <input
            type="number"
            min="1"
            {...register("capacity", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800 ${
              errors.capacity ? "border-red-500" : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField label="Зона" required error={errors.location?.message}>
          <select
            {...register("location")}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          >
            {LOCATIONS.map((loc) => (
              <option key={loc.value} value={loc.value}>{loc.label}</option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Опис" error={errors.description?.message} hint="До 300 символів">
        <textarea
          rows="4"
          {...register("description")}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-800"
        />
      </FormField>

      <FormField>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" {...register("isAvailable")} className="w-4 h-4" />
          <span className="text-gray-700">Вільний для бронювання</span>
        </label>
      </FormField>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-800 text-white px-6 py-3 rounded hover:bg-slate-700 font-bold disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Збереження..." : isEdit ? "Зберегти зміни" : "Створити"}
        </button>
        <Link
          href={isEdit ? `/dashboard/tables/${tableId}` : "/dashboard/tables"}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded hover:bg-gray-300 font-bold inline-block"
        >
          Скасувати
        </Link>
      </div>
    </form>
  );
}
