// Тиждень 11: Сторінка створення замовлення
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OrderForm from '@/components/OrderForm'

export default function NewOrderPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const body = await res.json().catch(() => ({}))
    setSubmitting(false)
    if (!res.ok) {
      setError(body.errors?.join(', ') || body.error || 'Помилка створення')
      return
    }
    router.push(`/dashboard/orders/${body._id}`)
    router.refresh()
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Нове замовлення</h1>
      <OrderForm onSubmit={handleSubmit} isSubmitting={submitting} error={error} />
    </div>
  )
}
