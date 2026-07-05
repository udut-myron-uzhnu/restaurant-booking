# Ресторан «Веранда» — онлайн-бронювання столів

Full-stack застосунок для бронювання столів у ресторані: гість переглядає доступні столи, обирає зал і кількість гостей та створює замовлення; менеджер керує столами, замовленнями та користувачами.

> **Демо:** _посилання на Vercel-деплой додається після деплойменту._

## Скріншоти

_Головна сторінка, панель керування, форма замовлення та деталі замовлення — додаються після деплойменту._

## Можливості

- Аутентифікація — реєстрація, вхід, вихід (NextAuth.js, Credentials)
- RBAC — дві ролі (admin/менеджер, user/гість) з розмежуванням доступу
- CRUD столів із валідацією та санітизацією
- Друга сутність зі зв'язками — замовлення столів (1-to-many + many-to-many через проміжну модель)
- Сучасні форми — React Hook Form + Zod + Sonner
- Безпека — серверна валідація, санітизація, безпекові HTTP-заголовки, захист від IDOR
- Production-ready — next/image, SEO-metadata з OpenGraph, robots.txt + sitemap.xml

## Технологічний стек

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend:** Next.js API Routes, NextAuth.js, bcryptjs
- **База даних:** MongoDB + Mongoose ODM
- **Форми та валідація:** React Hook Form + Zod
- **Сповіщення:** Sonner (toast)
- **Деплой:** Vercel + GitHub (auto-deploy на push)

## Локальний запуск

```bash
git clone https://github.com/<your-username>/restaurant-booking.git
cd restaurant-booking
npm install
cp .env.local.example .env.local
# заповніть змінні у .env.local
npm run dev
```

Наповнити базу початковими даними: відкрити `http://localhost:3000/api/seed`.

## Змінні середовища

| Змінна | Опис |
|--------|------|
| `MONGODB_URI` | Рядок підключення до MongoDB (локально або Atlas) |
| `NEXTAUTH_SECRET` | Секрет для JWT; згенерувати: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL застосунку (на Vercel — публічний URL) |
| `NEXT_PUBLIC_SITE_URL` | URL для metadata, sitemap та robots |

## Структура репозиторію

Кожна практична робота — в окремій гілці `LR1…LR13`; гілка `main` містить повну версію проєкту.

## Деплой на Vercel

1. Push коду на GitHub.
2. На [vercel.com](https://vercel.com) — Add New Project → Import репозиторію.
3. Додати змінні середовища з `.env.local.example`.
4. Deploy.
5. Оновити `NEXTAUTH_URL` та `NEXT_PUBLIC_SITE_URL` на отриманий Vercel-URL → Redeploy.
6. У MongoDB Atlas дозволити доступ із мережі Vercel (Network Access → `0.0.0.0/0`).

Кожен подальший push у `main` автоматично запускає новий деплой.
