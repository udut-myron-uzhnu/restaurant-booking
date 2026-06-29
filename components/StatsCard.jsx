const colorClasses = {
  slate: 'text-slate-800',
  green: 'text-green-700',
  gray: 'text-gray-600',
}

export default function StatsCard({ title, value, color = 'slate' }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-gray-500 text-sm font-bold">{title}</h3>
      <p className={`text-4xl font-bold mt-2 ${colorClasses[color] || colorClasses.slate}`}>
        {value}
      </p>
    </div>
  )
}
