import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Ресторан «Веранда» — бронювання столів",
    template: "%s | Веранда",
  },
  description: "Онлайн-бронювання столів у ресторані «Веранда»",
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
      </body>
    </html>
  );
}
