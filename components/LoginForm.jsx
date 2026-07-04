// Тиждень 12: LoginForm на RHF + Zod resolver + Sonner
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { loginSchema } from "@/lib/validations/auth";
import FormField from "@/components/forms/FormField";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", { ...data, redirect: false });
      if (result?.error) {
        setError("password", { type: "server", message: "Невірний email або пароль" });
        toast.error("Не вдалося увійти");
        return;
      }
      toast.success("Вітаємо у «Веранді»!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Помилка при вході");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Вхід</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Email" error={errors.email?.message}>
            <input
              type="email"
              autoComplete="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
            />
          </FormField>
          <FormField label="Пароль" error={errors.password?.message}>
            <input
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
            />
          </FormField>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700 font-bold disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Вхід..." : "Увійти"}
          </button>
        </form>
        <p className="text-center mt-4 text-slate-600">
          Немає акаунту?{" "}
          <Link href="/auth/register" className="text-slate-800 font-semibold hover:underline">
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}
