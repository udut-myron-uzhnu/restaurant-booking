'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TableForm from '@/components/TableForm'

export default function NewTablePage() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    setError(null)
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.errors?.join(', ') || data.error || 'Помилка створення')
      }
      router.push('/dashboard/tables')
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Link href="/dashboard/tables" className="text-slate-700 hover:underline mb-4 inline-block">
        ← Назад до списку
      </Link>
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Додати новий стіл</h1>
        <TableForm onSubmit={handleSubmit} submitLabel="Створити" isSubmitting={isSubmitting} error={error} />
      </div>
    </div>
  )
}
