'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export default function TableActions({ tableId }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  // Тиждень 9: кнопки дій доступні лише адміністратору
  if (session?.user?.role !== 'admin') return null

  function handleEdit() {
    router.push(`/dashboard/tables/${tableId}/edit`)
  }

  async function handleDelete() {
    setLoading(true)
    try {
      const response = await fetch(`/api/tables/${tableId}`, { method: 'DELETE' })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || 'Помилка видалення')
      }
      toast.success('Стіл видалено')
      router.push('/dashboard/tables')
      router.refresh()
    } catch (err) {
      toast.error(err.message)
      setShowConfirm(false)
    } finally {
      setLoading(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-semibold mr-1">Видалити стіл?</span>
        <button onClick={handleDelete} disabled={loading} className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 cursor-pointer disabled:opacity-50">
          {loading ? 'Видалення...' : 'Так'}
        </button>
        <button onClick={() => setShowConfirm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">
          Ні
        </button>
      </div>
    )
  }

  return (
    <div className="space-x-2">
      <button onClick={handleEdit} className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 cursor-pointer">
        Редагувати
      </button>
      <button onClick={() => setShowConfirm(true)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">
        Видалити
      </button>
    </div>
  )
}
