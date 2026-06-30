'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const zones = { main_hall: "Основна зала", terrace: "Тераса", vip: "VIP", bar: "Бар" }

export default function DashboardTablesPage() {
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchTables() {
    try {
      setLoading(true)
      const response = await fetch('/api/tables')
      if (!response.ok) throw new Error('Помилка завантаження')
      const data = await response.json()
      setTables(data.tables)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTables()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Видалити цей стіл?')) return
    try {
      const response = await fetch(`/api/tables/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Помилка видалення')
      fetchTables()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded p-4">
        <p className="text-red-700">{error}</p>
        <button onClick={fetchTables} className="mt-2 text-slate-700 underline cursor-pointer">Спробувати знову</button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Столи ({tables.length})</h1>
        <Link href="/dashboard/tables/new" className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800">
          Додати стіл
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Номер</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Зона</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Місткість</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Статус</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Дії</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table._id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link href={`/dashboard/tables/${table._id}`} className="text-slate-700 hover:underline font-medium">
                    Стіл №{table.number}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-600">{zones[table.location]}</td>
                <td className="px-6 py-4 text-gray-600">{table.capacity} осіб</td>
                <td className="px-6 py-4">
                  {table.isAvailable ? (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Вільний</span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600">Зайнятий</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(table._id)} className="text-red-700 hover:text-red-900 cursor-pointer">
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
