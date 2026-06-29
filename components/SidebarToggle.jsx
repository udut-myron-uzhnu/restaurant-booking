'use client'

export default function SidebarToggle({ isOpen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left text-gray-400 hover:text-white transition mb-4 cursor-pointer"
      title={isOpen ? 'Згорнути меню' : 'Розгорнути меню'}
    >
      {isOpen ? '‹ Згорнути' : '›'}
    </button>
  )
}
