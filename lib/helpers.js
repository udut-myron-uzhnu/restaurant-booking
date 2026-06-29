import { tables } from './tables'

export function getTableStats() {
  const total = tables.length
  const available = tables.filter((table) => table.available).length
  const unavailable = total - available
  const zones = [...new Set(tables.map((table) => table.location))]
  const avgCapacity = Math.round(tables.reduce((sum, table) => sum + table.capacity, 0) / total)
  return { total, available, unavailable, zonesCount: zones.length, avgCapacity }
}
