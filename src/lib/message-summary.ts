import { formatMemoryGb, formatPriceRub } from "./pricing";

export interface SummaryData {
  name: string;
  phone: string;
  model: string;
  memoryGb: number;
  condition: string;
  estimatedPrice: number;
  telegramUsername?: string;
  vkProfileUrl?: string;
  comment?: string;
}

export function buildApplicationSummary(data: SummaryData): string {
  const tg = data.telegramUsername
    ? `@${data.telegramUsername.replace(/^@/, "")}`
    : "—";

  const lines = [
    "📱 Новая заявка на выкуп iPhone",
    "",
    `👤 Имя: ${data.name}`,
    `📲 Модель: ${data.model}`,
    `💾 Память: ${formatMemoryGb(data.memoryGb)}`,
    `🔧 Состояние: ${data.condition}`,
    `💰 Итоговая цена: ${formatPriceRub(data.estimatedPrice)}`,
    `📞 Телефон: ${data.phone}`,
    `✈️ Telegram: ${tg}`,
    `🔵 VK: ${data.vkProfileUrl?.trim() || "—"}`,
  ];

  if (data.comment?.trim()) {
    lines.push(`💬 Комментарий: ${data.comment.trim()}`);
  }

  lines.push(
    "",
    `🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Chita" })} (Чита)`,
  );

  return lines.join("\n");
}
