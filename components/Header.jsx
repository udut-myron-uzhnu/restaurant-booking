import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-800 text-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Веранда
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-slate-300">Головна</Link>
            </li>
            <li>
              <Link href="/tables" className="hover:text-slate-300">Столи</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-slate-300">Про нас</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
