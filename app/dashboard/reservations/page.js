'use client'

import { useState, useEffect } from 'react'

const statusLabels = {
  pending: "Очікує",
  confirmed: "Підтверджено",
  completed: "Завершено",
  cancelled: "Скасовано",
}

const statusStyles = {
  pending: "bg-gray-100 text-gray-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-slate-100 text-slate-700",
  cancelled: "bg-gray-200 text-gray-500",
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('/api/reservations')
        if (!response.ok) throw new Error('Помилка завантаження')
        const data = await response.json()
        setReservations(data.reservations)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
      </div>
    )
  }

  if (error) {
    return <p className="text-red-700">{error}</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Бронювання</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Стіл</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Гість</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Час</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Гостей</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {reservation.table ? `Стіл №${reservation.table.number}` : "—"}
                </td>
                <td className="px-6 py-4 text-gray-700">{reservation.guestName}</td>
                <td className="px-6 py-4 text-gray-700">{reservation.date?.slice(0, 10)}</td>
                <td className="px-6 py-4 text-gray-700">{reservation.time}</td>
                <td className="px-6 py-4 text-gray-700">{reservation.guestCount}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded ${statusStyles[reservation.status]}`}>
                    {statusLabels[reservation.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
