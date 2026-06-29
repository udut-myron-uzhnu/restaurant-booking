export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Ресторан «Веранда»</h1>
          <p className="text-xl mb-8 text-slate-200">
            Бронювання столів онлайн — оберіть зал, дату та час.
          </p>
          <button className="bg-white text-slate-800 px-8 py-3 rounded font-semibold">
            Забронювати стіл
          </button>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Можливості системи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Перегляд столів</h3>
              <p className="text-gray-600">
                Столи в чотирьох зонах: основна зала, тераса, VIP та бар.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Онлайн-бронювання</h3>
              <p className="text-gray-600">
                Бронювання столу на потрібну дату та час у кілька кроків.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Статус заявки</h3>
              <p className="text-gray-600">
                Менеджер підтверджує бронювання, гість бачить його статус.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Удут М.М. | Курс «Основи обробки та передачі інформації»
          </p>
        </div>
      </footer>
    </div>
  );
}
