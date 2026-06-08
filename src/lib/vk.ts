import { VK } from "vk-io";

let vkInstance: VK | null = null;

export function getVkClient(): VK {
  const token = process.env.VK_ACCESS_TOKEN;
  if (!token) {
    throw new Error("VK_ACCESS_TOKEN не задан в .env.local");
  }

  if (!vkInstance) {
    vkInstance = new VK({ token });
  }

  return vkInstance;
}

export function getVkPeerId(): number {
  const peerId = process.env.VK_PEER_ID;
  if (!peerId) {
    throw new Error("VK_PEER_ID не задан в .env.local");
  }

  const parsed = Number(peerId);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("VK_PEER_ID должен быть положительным числом");
  }

  return parsed;
}

export function randomVkId(): number {
  return Math.floor(Math.random() * 2_147_483_647);
}
