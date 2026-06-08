import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import {
  AVITO_REVIEWS_COUNT,
  AVITO_URL,
  CITY,
  PRODUCT_BANNER_SRC,
} from "@/lib/constants";

export function AvitoBanner() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <FadeIn>
        <div className="relative mx-auto h-[min(70vh,560px)] w-[85%] min-h-[360px] overflow-hidden rounded-3xl sm:h-[min(75vh,620px)]">
          <Image
            src={PRODUCT_BANNER_SRC}
            alt={`Выкуп iPhone в ${CITY}`}
            fill
            className="object-cover object-center"
            sizes="85vw"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40" />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-20 sm:px-10 sm:pb-10">
            <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
              <div className="max-w-xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00AAFF]/40 bg-[#00AAFF]/15 px-3 py-1 text-xs font-medium text-[#66ccff] backdrop-blur-sm sm:text-sm">
                  <Star className="h-3.5 w-3.5 fill-[#00AAFF] text-[#00AAFF]" />
                  Проверенный продавец на Авито
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Более{" "}
                  <span className="text-[#00AAFF]">{AVITO_REVIEWS_COUNT}+</span>{" "}
                  положительных отзывов
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                  Сотни успешных сделок по {CITY} — читайте реальные отзывы
                  покупателей и продавцов
                </p>
              </div>

              <Button
                size="lg"
                variant="avito"
                asChild
                className="shrink-0 px-8 shadow-lg shadow-[#00AAFF]/30"
              >
                <a href={AVITO_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Смотреть на Авито
                </a>
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
