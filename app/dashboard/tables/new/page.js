'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewTablePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    number: "",
    capacity: "",
    location: "main_hall",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Новий стіл:", formData);
    router.push("/dashboard/tables");
  };

  return (
    <div>
      <Link href="/dashboard/tables" className="text-slate-700 hover:underline inline-block mb-4">
        ← Назад до списку
      </Link>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Додати новий стіл</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Номер столу *</label>
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Місткість *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Зона *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="main_hall">Основна зала</option>
                <option value="terrace">Тераса</option>
                <option value="vip">VIP</option>
                <option value="bar">Бар</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Опис</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-slate-700 text-white px-6 py-3 rounded hover:bg-slate-800">
              Створити
            </button>
            <Link href="/dashboard/tables" className="bg-gray-200 text-gray-700 px-6 py-3 rounded hover:bg-gray-300">
              Скасувати
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
