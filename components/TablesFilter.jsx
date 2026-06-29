'use client'

import { useState } from 'react'
import TableCard from './TableCard'

const zones = {
  main_hall: "Основна зала",
  terrace: "Тераса",
  vip: "VIP",
  bar: "Бар",
}

const tables = [
  { id: 1, number: 1, capacity: 2, location: "main_hall", description: "Затишний стіл біля вікна.", available: true },
  { id: 2, number: 2, capacity: 4, location: "main_hall", description: "Стіл у центрі зали.", available: true },
  { id: 3, number: 3, capacity: 4, location: "main_hall", description: "Стіл поруч із каміном.", available: false },
  { id: 4, number: 4, capacity: 2, location: "terrace", description: "Стіл на терасі з краєвидом на сад.", available: true },
  { id: 5, number: 5, capacity: 6, location: "terrace", description: "Великий стіл на терасі для компанії.", available: true },
  { id: 6, number: 6, capacity: 2, location: "bar", description: "Місце біля барної стійки.", available: true },
  { id: 7, number: 7, capacity: 3, location: "bar", description: "Високий стіл біля бару.", available: false },
  { id: 8, number: 8, capacity: 6, location: "vip", description: "Окремий VIP-стіл для компанії.", available: true },
  { id: 9, number: 9, capacity: 8, location: "vip", description: "Простора VIP-зона з диванами.", available: true },
  { id: 10, number: 10, capacity: 4, location: "main_hall", description: "Стіл біля панорамного вікна.", available: true },
]

const categories = ["Всі", ...Object.keys(zones)]

export default function TablesFilter() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Всі')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  // keep only tables that match the search text, selected zone and availability
  const filteredTables = tables.filter(table => {
    const matchesSearch =
      String(table.number).includes(search.trim()) ||
      zones[table.location].toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'Всі' || table.location === activeCategory
    const matchesAvailability = !showAvailableOnly || table.available
    return matchesSearch && matchesCategory && matchesAvailability
  })

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Пошук за номером або зоною..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-slate-500"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
              activeCategory === cat
                ? 'bg-slate-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat === 'Всі' ? 'Всі' : zones[cat]}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(e) => setShowAvailableOnly(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-gray-700">Тільки вільні столи</span>
      </label>

      <p className="text-sm text-gray-500 mb-4">
        Знайдено: {filteredTables.length} з {tables.length}
      </p>

      {filteredTables.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTables.map(table => (
            <TableCard key={table.id} {...table} />
          ))}
        </div>
      ) : (
        <p className="text-center py-12 text-gray-400">Нічого не знайдено</p>
      )}
    </div>
  )
}
