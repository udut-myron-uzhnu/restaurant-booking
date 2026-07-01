"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Невірний email або пароль");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Щось пішло не так");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Вхід</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-2">Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700 font-bold disabled:opacity-50"
          >
            {isLoading ? "Вхід..." : "Увійти"}
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
