export const metadata = {
  title: "Контакти",
  description: "Контакти ресторану «Веранда»",
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Контакти</h1>
          <p className="text-lg text-slate-200">Завжди раді вашому візиту.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Наші контакти</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900">Адреса</p>
                  <p className="text-gray-600">вул. Корзо, 12, м. Ужгород</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Телефон</p>
                  <p className="text-gray-600">+380 (312) 64-00-00</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Графік роботи</p>
                  <p className="text-gray-600">Пн–Пт: 10:00 – 22:00</p>
                  <p className="text-gray-600">Сб–Нд: 11:00 – 23:00</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Напишіть нам</h2>
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                <p className="text-gray-600">Форму зворотного зв'язку буде додано в наступних роботах.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
