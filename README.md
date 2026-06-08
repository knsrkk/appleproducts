# Apple Выкуп Чита

Сайт на **Next.js** (App Router) для бизнеса по выкупу iPhone и техники Apple в городе **Чита**. Форма заявки отправляет уведомления в **VK** (личные сообщения) с данными клиента и фото.

## Стек

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Hook Form + Zod
- vk-io (отправка в VK)
- Axios

## Быстрый старт

```bash
npm install
cp .env.local.example .env.local
# Заполните VK_ACCESS_TOKEN и VK_PEER_ID
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Настройка VK

### 1. Получить токен

1. Создайте приложение VK: [vk.com/apps?act=manage](https://vk.com/apps?act=manage)
2. Получите токен с правами `messages`, `photos`, `docs` (для загрузки фото в ЛС)
3. Токен можно получить через OAuth или токен сообщества, если бот пишет от имени группы

### 2. Peer ID

`VK_PEER_ID` — ваш числовой ID ВКонтакте (для личных сообщений).

Узнать ID: [vk.com/edit?act=contacts](https://vk.com/edit?act=contacts) или через API `users.get`.

### 3. Переменные окружения

```env
VK_ACCESS_TOKEN=ваш_токен
VK_PEER_ID=123456789
```

## API

| Маршрут | Метод | Описание |
|---------|--------|----------|
| `/api/send-vk` | POST | JSON с полями формы + фото (base64) → сообщение в VK |
| `/api/upload` | POST | Загрузка файла (legacy, форма шлёт base64 напрямую в VK) |

## Контакты и Авито

Настройте в `src/lib/constants.ts`:

- `PHONE_DISPLAY`, `WHATSAPP_URL`, `TELEGRAM_URL`
- `AVITO_URL` — ссылка на профиль Авито

## Деплой на Vercel

1. Импортируйте репозиторий на [vercel.com](https://vercel.com)
2. В **Environment Variables** добавьте `VK_ACCESS_TOKEN` и `VK_PEER_ID`
3. Deploy

## Структура

```
src/
├── app/api/send-vk/route.ts
├── components/
│   ├── AvitoBanner.tsx
│   ├── SellForm.tsx
│   └── ...
└── lib/
    ├── price-data.ts   # полный прайс
    ├── vk.ts
    └── message-summary.ts
public/appleproduct-banner.png
```
