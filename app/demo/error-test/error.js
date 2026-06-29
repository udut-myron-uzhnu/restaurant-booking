'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Помилка:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-2">Виникла помилка</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-slate-700 text-white px-6 py-3 rounded hover:bg-slate-800 cursor-pointer"
        >
          Спробувати знову
        </button>
      </div>
    </div>
  )
}
