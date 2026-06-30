'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import TableForm from '@/components/TableForm'

export default function EditTablePage() {
  const { id } = useParams()
  const router = useRouter()
  const [table, setTable] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/tables/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Стіл не знайдено')
        return res.json()
      })
      .then((data) => {
        setTable(data)
        setLoading(false)
      })
      .catch((err) => {
        setLoadError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleSubmit = async (formData) => {
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/tables/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.errors?.join(', ') || data.error || 'Помилка оновлення')
      }
      router.push(`/dashboard/tables/${id}`)
    } catch (err) {
      setSubmitError(err.message)
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div>
        <Link href="/dashboard/tables" className="text-slate-700 hover:underline mb-4 inline-block">← Назад до списку</Link>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Помилка</h2>
          <p className="text-gray-600">{loadError}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link href={`/dashboard/tables/${id}`} className="text-slate-700 hover:underline mb-4 inline-block">
        ← Назад до столу
      </Link>
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Редагувати: Стіл №{table.number}</h1>
        <TableForm
          initialData={table}
          onSubmit={handleSubmit}
          submitLabel="Зберегти зміни"
          isSubmitting={isSubmitting}
          error={submitError}
        />
      </div>
    </div>
  )
}
