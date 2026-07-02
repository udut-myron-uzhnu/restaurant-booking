'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/tables", label: "Столи" },
  { href: "/about", label: "Про нас" },
  { href: "/contact", label: "Контакти" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="bg-slate-800 text-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Веранда
        </Link>
        <nav className="flex items-center gap-6">
          <ul className="flex gap-6">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition ${
                      isActive ? "text-white font-semibold" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Блок автентифікації */}
          {status === "loading" ? (
            <span className="text-slate-300 text-sm">...</span>
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-slate-300 hover:text-white transition"
              >
                {session.user.name}
              </Link>
              {/* Тиждень 9: badge ролі */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  session.user.role === "admin"
                    ? "bg-red-500 text-white"
                    : "bg-slate-600 text-slate-100"
                }`}
              >
                {session.user.role}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm transition"
              >
                Вийти
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded transition"
            >
              Увійти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
