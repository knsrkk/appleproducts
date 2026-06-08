import { NextRequest, NextResponse } from "next/server";
import { buildApplicationSummary } from "@/lib/message-summary";
import { getVkClient, getVkPeerId, randomVkId } from "@/lib/vk";
import { submitPayloadSchema } from "@/lib/validation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 25 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.VK_ACCESS_TOKEN || !process.env.VK_PEER_ID) {
      return NextResponse.json(
        {
          error:
            "VK не настроен. Добавьте VK_ACCESS_TOKEN и VK_PEER_ID в .env.local",
        },
        { status: 500 },
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Слишком большой размер заявки" },
        { status: 413 },
      );
    }

    const body: unknown = await request.json();
    const parsed = submitPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некорректные данные формы", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const {
      name,
      phone,
      model,
      memoryGb,
      condition,
      comment,
      telegramUsername: rawTg,
      vkProfileUrl,
      estimatedPrice,
      photos,
    } = parsed.data;

    const telegramUsername = rawTg?.replace(/^@/, "").trim() || undefined;
    const summary = buildApplicationSummary({
      name,
      phone,
      model,
      memoryGb,
      condition,
      estimatedPrice,
      telegramUsername,
      vkProfileUrl: vkProfileUrl?.trim() || undefined,
      comment,
    });

    const vk = getVkClient();
    const peerId = getVkPeerId();

    let attachment: string | undefined;

    if (photos && photos.length > 0) {
      const uploads = await Promise.all(
        photos.map((photo, i) => {
          const ext =
            photo.mimeType.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
          const buffer = Buffer.from(photo.data, "base64");

          return vk.upload.messagePhoto({
            peer_id: peerId,
            source: {
              value: buffer,
              filename: photo.fileName ?? `photo-${i + 1}.${ext}`,
              contentType: photo.mimeType,
            },
          });
        }),
      );

      attachment = uploads.map((item) => item.toString()).join(",");
    }

    await vk.api.messages.send({
      peer_id: peerId,
      message: summary,
      attachment,
      random_id: randomVkId(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("VK send error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Не удалось отправить сообщение в VK",
      },
      { status: 500 },
    );
  }
}
