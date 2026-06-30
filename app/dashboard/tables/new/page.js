'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewTablePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const formData = new FormData(e.target)
    const data = {
      number: Number(formData.get('number')),
      capacity: Number(formData.get('capacity')),
      location: formData.get('location'),
      description: formData.get('description'),
      available: formData.get('available') === 'on',
    }

    try {
      const response = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Помилка створення')
      }
      router.push('/dashboard/tables')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <Link href="/dashboard/tables" className="text-slate-700 hover:underline">
        ← Назад до списку
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-6 text-gray-900">Додати стіл</h1>
      {error && (
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4 max-w-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Номер столу</label>
          <input type="number" name="number" min="1" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Місткість</label>
          <input type="number" name="capacity" min="1" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Зона</label>
          <select name="location" required className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="main_hall">Основна зала</option>
            <option value="terrace">Тераса</option>
            <option value="vip">VIP</option>
            <option value="bar">Бар</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
          <textarea name="description" rows="3" className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
        </div>
        <div className="mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="available" defaultChecked />
            <span className="text-sm text-gray-700">Вільний</span>
          </label>
        </div>
        <button type="submit" disabled={saving} className="bg-slate-700 text-white px-6 py-2 rounded hover:bg-slate-800 disabled:opacity-60">
          {saving ? 'Збереження...' : 'Створити стіл'}
        </button>
      </form>
    </div>
  )
}
