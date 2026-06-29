const statusLabels = {
  pending: "Очікує",
  confirmed: "Підтверджено",
  completed: "Завершено",
  cancelled: "Скасовано",
};

const statusStyles = {
  pending: "bg-gray-100 text-gray-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-slate-100 text-slate-700",
  cancelled: "bg-gray-200 text-gray-500",
};

const reservations = [
  { id: 1, table: 4, guest: "Іван Петренко", date: "2026-06-30", time: "18:00", guestCount: 2, status: "confirmed" },
  { id: 2, table: 8, guest: "Марія Коваль", date: "2026-06-30", time: "19:30", guestCount: 5, status: "pending" },
  { id: 3, table: 1, guest: "Олег Сидоренко", date: "2026-06-29", time: "13:00", guestCount: 2, status: "completed" },
  { id: 4, table: 5, guest: "Наталія Бойко", date: "2026-07-01", time: "20:00", guestCount: 6, status: "pending" },
  { id: 5, table: 2, guest: "Андрій Ткач", date: "2026-06-28", time: "12:30", guestCount: 3, status: "cancelled" },
];

export const metadata = {
  title: "Бронювання",
};

export default function ReservationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Бронювання</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Стіл</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Гість</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Час</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Гостей</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Стіл №{reservation.table}</td>
                <td className="px-6 py-4 text-gray-700">{reservation.guest}</td>
                <td className="px-6 py-4 text-gray-700">{reservation.date}</td>
                <td className="px-6 py-4 text-gray-700">{reservation.time}</td>
                <td className="px-6 py-4 text-gray-700">{reservation.guestCount}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded ${statusStyles[reservation.status]}`}>
                    {statusLabels[reservation.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
