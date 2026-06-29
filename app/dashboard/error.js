'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Помилка в панелі керування:', error)
  }, [error])

  return (
    <div className="max-w-md mx-auto mt-12 bg-white border border-gray-200 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Помилка в панелі керування</h2>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 cursor-pointer"
        >
          Спробувати знову
        </button>
        <Link href="/" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
          На головну
        </Link>
      </div>
    </div>
  )
}
