// Тиждень 11: Редагування замовлення (admin only — status + notes)
// Столи замовлення (items) у цьому тижні read-only.
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const STATUSES = [
  { value: 'pending', label: 'Очікує' },
  { value: 'confirmed', label: 'Підтверджено' },
  { value: 'seated', label: 'Розсаджено' },
  { value: 'completed', label: 'Виконано' },
  { value: 'cancelled', label: 'Скасовано' },
]

export default function EditOrderPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session, status: sessionStatus } = useSession()

  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('pending')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setLoading(false)
          return
        }
        setOrder(data)
        setStatus(data.status)
        setNotes(data.notes || '')
        setLoading(false)
      })
  }, [params.id])

  if (sessionStatus === 'loading' || loading) {
    return <div className="text-gray-500">Завантаження...</div>
  }

  if (session?.user?.role !== 'admin') {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
        Редагувати замовлення може лише адміністратор.
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const res = await fetch(`/api/orders/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    })
    const body = await res.json().catch(() => ({}))
    setSaving(false)
    if (!res.ok) {
      setError(body.errors?.join(', ') || body.error || 'Помилка збереження')
      return
    }
    router.push(`/dashboard/orders/${params.id}`)
    router.refresh()
  }

  if (!order) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
        {error || 'Замовлення не знайдено'}
      </div>
    )
  }

  const items = order.items || []

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href={`/dashboard/orders/${params.id}`} className="text-slate-800 hover:underline text-sm">
          &larr; До замовлення
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Редагування замовлення</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-5">
        <div className="text-sm text-gray-600 border-b pb-3">
          <div>Замовник: <strong>{order.user?.name}</strong></div>
          <div className="mt-2">Столи (read-only):</div>
          <ul className="mt-1 ml-4 list-disc">
            {items.map((it) => (
              <li key={it._id}>
                {it.table ? `Стіл №${it.table.number}` : '(стіл видалено)'} · {it.guestCount} гост.
                (до {it.capacitySnapshot} осіб)
              </li>
            ))}
          </ul>
          <div className="mt-2">
            Гостей усього: <strong>{order.totalGuests}</strong>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Статус *</label>
          <select
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Коментар</label>
          <textarea
            rows="3"
            maxLength="300"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-slate-800 text-white px-6 py-3 rounded hover:bg-slate-700 font-bold disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Збереження...' : 'Зберегти'}
          </button>
          <Link
            href={`/dashboard/orders/${params.id}`}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-medium"
          >
            Скасувати
          </Link>
        </div>
      </form>
    </div>
  )
}
