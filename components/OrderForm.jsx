'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const ZONES = { main_hall: 'Основна зала', terrace: 'Тераса', vip: 'VIP', bar: 'Бар' }

// Створити пусту позицію для додавання
const emptyItem = () => ({ table: '', guestCount: 1 })

export default function OrderForm({ onSubmit, isSubmitting, error }) {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  const [tables, setTables] = useState([])
  const [items, setItems] = useState([emptyItem()])
  const [notes, setNotes] = useState('')
  const [loadingTables, setLoadingTables] = useState(true)

  // Список користувачів — лише для admin (для вибору власника замовлення).
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    fetch('/api/tables')
      .then((res) => res.json())
      .then((data) => {
        const available = (data.tables || []).filter((t) => t.isAvailable)
        setTables(available)
        setLoadingTables(false)
      })
      .catch(() => setLoadingTables(false))
  }, [])

  useEffect(() => {
    if (!isAdmin) return
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data)
      })
      .catch(() => {})
  }, [isAdmin])

  // За замовчуванням — сам admin (типовий випадок: admin створює тестове замовлення).
  useEffect(() => {
    if (isAdmin && session?.user?.id && !userId) {
      setUserId(session.user.id)
    }
  }, [isAdmin, session?.user?.id, userId])

  const tablesById = useMemo(() => {
    const map = new Map()
    tables.forEach((t) => map.set(t._id, t))
    return map
  }, [tables])

  const totalGuests = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.guestCount || 0), 0)
  }, [items])

  const updateItem = (index, patch) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)))
  }
  const addItem = () => setItems((prev) => [...prev, emptyItem()])
  const removeItem = (index) => {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))
  }

  const canSubmit =
    items.length > 0 &&
    items.every((it) => it.table && Number(it.guestCount) >= 1) &&
    (!isAdmin || Boolean(userId))

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      items: items.map((it) => ({ table: it.table, guestCount: Number(it.guestCount) })),
      notes: notes.trim(),
    }
    if (isAdmin && userId) payload.user = userId
    onSubmit(payload)
  }

  if (loadingTables) {
    return <div className="bg-white rounded-lg shadow p-8 text-gray-500">Завантаження столів...</div>
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {isAdmin && (
          <div>
            <label className="block text-gray-700 font-bold mb-2">Замовник *</label>
            <select
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
            >
              <option value="">Оберіть користувача</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email}){u.role === 'admin' ? ' — admin' : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Адміністратор може створити замовлення на будь-якого користувача.
            </p>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-gray-700 font-bold">Столи *</label>
            <button
              type="button"
              onClick={addItem}
              className="text-slate-800 hover:underline text-sm font-medium cursor-pointer"
            >
              + Додати стіл
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => {
              const table = tablesById.get(item.table)
              return (
                <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded border">
                  <div className="flex-1">
                    <select
                      required
                      value={item.table}
                      onChange={(e) => updateItem(index, { table: e.target.value })}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-slate-800"
                    >
                      <option value="">Оберіть стіл</option>
                      {tables.map((t) => (
                        <option key={t._id} value={t._id}>
                          Стіл №{t.number} — {ZONES[t.location]}, до {t.capacity} осіб
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-28">
                    <input
                      type="number"
                      min="1"
                      max={table ? table.capacity : 20}
                      required
                      value={item.guestCount}
                      onChange={(e) => updateItem(index, { guestCount: e.target.value })}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-slate-800"
                      title="Кількість гостей"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                    className="text-red-600 hover:text-red-800 disabled:text-gray-300 text-xl px-2 cursor-pointer"
                    title="Видалити стіл"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Коментар</label>
          <textarea
            rows="3"
            maxLength="300"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Напр.: святкування дня народження, потрібен дитячий стільчик..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-slate-800"
          />
        </div>

        {totalGuests > 0 && (
          <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded">
            <p className="text-gray-700">
              <strong>Гостей усього:</strong>{' '}
              <span className="text-xl font-bold text-slate-800">{totalGuests}</span>
              <span className="text-sm text-gray-500 ml-2">({items.length} ст.)</span>
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !canSubmit}
            className="bg-slate-800 text-white px-6 py-3 rounded hover:bg-slate-700 font-bold disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Створення...' : 'Створити замовлення'}
          </button>
          <Link
            href="/dashboard/orders"
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-medium"
          >
            Скасувати
          </Link>
        </div>
      </form>
    </>
  )
}
