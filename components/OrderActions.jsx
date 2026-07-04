// Тиждень 11: Кнопки дій над замовленням
// Admin: редагувати статус, видалити. User (owner, pending): скасувати
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OrderActions({ order, role, currentUserId }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isAdmin = role === 'admin'
  const isOwner = (order.user?._id || order.user || '').toString() === currentUserId
  const canCancel = isOwner && order.status === 'pending'

  const handleDelete = async () => {
    if (!confirm('Видалити замовлення безповоротно?')) return
    setLoading(true)
    const res = await fetch(`/api/orders/${order._id}`, { method: 'DELETE' })
    setLoading(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Помилка видалення')
      return
    }
    router.push('/dashboard/orders')
    router.refresh()
  }

  const handleCancel = async () => {
    if (!confirm('Скасувати це замовлення?')) return
    setLoading(true)
    const res = await fetch(`/api/orders/${order._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' }),
    })
    setLoading(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.errors?.[0] || data.error || 'Помилка скасування')
      return
    }
    router.refresh()
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-3">
          {error}
        </div>
      )}
      <div className="flex gap-3 flex-wrap">
        {isAdmin && (
          <>
            <Link
              href={`/dashboard/orders/${order._id}/edit`}
              className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 text-sm font-medium"
            >
              Редагувати
            </Link>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-medium disabled:opacity-50 cursor-pointer"
            >
              Видалити
            </button>
          </>
        )}
        {!isAdmin && canCancel && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-medium disabled:opacity-50 cursor-pointer"
          >
            Скасувати
          </button>
        )}
      </div>
    </div>
  )
}
