'use client'

import { useState } from 'react'
import Link from 'next/link'

const LOCATIONS = [
  { value: 'main_hall', label: 'Основна зала' },
  { value: 'terrace', label: 'Тераса' },
  { value: 'vip', label: 'VIP' },
  { value: 'bar', label: 'Бар' },
]

export default function TableForm({ initialData, onSubmit, submitLabel = 'Зберегти', isSubmitting, error }) {
  const [formData, setFormData] = useState({
    number: initialData?.number || '',
    capacity: initialData?.capacity || '',
    location: initialData?.location || 'main_hall',
    description: initialData?.description || '',
    isAvailable: initialData?.isAvailable !== undefined ? initialData.isAvailable : true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...formData, number: Number(formData.number), capacity: Number(formData.capacity) })
  }

  return (
    <>
      {error && (
        <div className="bg-gray-50 border border-gray-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Номер столу *</label>
            <input type="number" name="number" min="1" value={formData.number} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Місткість *</label>
            <input type="number" name="capacity" min="1" value={formData.capacity} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Зона *</label>
            <select name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded">
              {LOCATIONS.map((loc) => (
                <option key={loc.value} value={loc.value}>{loc.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Опис</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
            <span className="text-gray-700">Вільний</span>
          </label>
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={isSubmitting} className="bg-slate-700 text-white px-6 py-3 rounded hover:bg-slate-800 font-bold disabled:opacity-50">
            {isSubmitting ? 'Збереження...' : submitLabel}
          </button>
          <Link href="/dashboard/tables" className="bg-gray-200 text-gray-700 px-6 py-3 rounded hover:bg-gray-300 font-bold inline-block">
            Скасувати
          </Link>
        </div>
      </form>
    </>
  )
}
