export default function AboutPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Про проект</h1>
        <p className="text-lg text-gray-700 mb-4">
          «Веранда» — це система онлайн-бронювання столів у ресторані. Гість
          переглядає доступні столи, обирає зал, дату й час та залишає заявку на
          бронювання.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          У системі дві ролі. Менеджер додає та редагує столи, підтверджує або
          скасовує бронювання. Гість створює власні бронювання та може скасувати
          ті, що ще не підтверджені.
        </p>
        <p className="text-lg text-gray-700">
          Проект виконано в межах курсу «Основи обробки та передачі інформації»
          на стеку Next.js, React та MongoDB.
        </p>
      </div>
    </div>
  );
}
