'use client'

import { useFavorites } from '@/contexts/FavoritesContext'

export default function FavoriteButton({ tableId }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const liked = isFavorite(tableId)

  return (
    <button
      onClick={() => toggleFavorite(tableId)}
      className={`text-xs px-2 py-1 rounded border transition cursor-pointer ${
        liked
          ? 'bg-slate-700 text-white border-slate-700'
          : 'bg-white text-slate-700 border-gray-300 hover:bg-gray-100'
      }`}
      title={liked ? 'Прибрати з обраного' : 'Додати в обране'}
    >
      {liked ? 'В обраному' : 'В обране'}
    </button>
  )
}
