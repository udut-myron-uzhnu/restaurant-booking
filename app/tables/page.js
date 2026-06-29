import TablesFilter from "@/components/TablesFilter";

export default function TablesPage() {
  return (
    <div>
      <section className="bg-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Столи ресторану</h1>
          <p className="text-lg text-slate-200">Оберіть вільний стіл у потрібній зоні.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <TablesFilter />
        </div>
      </section>
    </div>
  );
}
