import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ресторан «Веранда» — бронювання столів",
    template: "%s | Веранда",
  },
  description: "Онлайн-бронювання столів у ресторані «Веранда»: оберіть зал, дату та час.",
  keywords: ["бронювання столів", "ресторан", "Веранда", "онлайн-бронювання"],
  authors: [{ name: "Ресторан «Веранда»" }],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: "Ресторан «Веранда»",
    title: "Ресторан «Веранда» — бронювання столів",
    description: "Онлайн-бронювання столів у ресторані «Веранда».",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Ресторан «Веранда»" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ресторан «Веранда» — бронювання столів",
    description: "Онлайн-бронювання столів у ресторані «Веранда».",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </FavoritesProvider>
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
