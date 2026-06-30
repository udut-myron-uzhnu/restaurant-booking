'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import TableActions from '@/components/TableActions'

const zones = { main_hall: "Основна зала", terrace: "Тераса", vip: "VIP", bar: "Бар" }

export default function TableDetailPage({ params }) {
  const { id } = use(params)
  const [table, setTable] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTable() {
      try {
        const response = await fetch(`/api/tables/${id}`)
        if (!response.ok) {
          if (response.status === 404) throw new Error('Стіл не знайдено')
          throw new Error('Помилка завантаження')
        }
        setTable(await response.json())
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTable()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">404</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/dashboard/tables" className="text-slate-700 hover:underline">
          ← До списку столів
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link href="/dashboard/tables" className="text-slate-700 hover:underline">
        ← Назад до списку
      </Link>
      <div className="bg-white rounded-lg border border-gray-200 p-8 mt-4">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Стіл №{table.number}</h1>
          <TableActions tableId={table.id} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Зона</p>
            <p className="text-lg font-medium text-gray-900">{zones[table.location]}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Місткість</p>
            <p className="text-lg font-medium text-gray-900">{table.capacity} осіб</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Статус</p>
            {table.available ? (
              <span className="text-green-700 font-semibold">Вільний</span>
            ) : (
              <span className="text-gray-500 font-semibold">Зайнятий</span>
            )}
          </div>
        </div>
        {table.description && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-1">Опис</p>
            <p className="text-gray-700">{table.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
