'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TableActions({ tableId }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  function handleEdit() {
    router.push(`/dashboard/tables/${tableId}/edit`)
  }

  async function handleDelete() {
    try {
      const response = await fetch(`/api/tables/${tableId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Помилка видалення')
      router.push('/dashboard/tables')
      router.refresh()
    } catch (err) {
      alert(err.message)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-semibold mr-1">Видалити стіл?</span>
        <button onClick={handleDelete} className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 cursor-pointer">
          Так
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
