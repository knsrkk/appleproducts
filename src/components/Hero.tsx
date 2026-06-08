import { Clock, MapPin, Send, ShieldCheck, Zap } from "lucide-react";

function VkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.653 0-.352.005-2.235.005-2.235s0-1.62.733-1.858c.747-.244 1.706 1.545 2.724 2.228.767.512 1.347.399 1.347.399l2.715-.039s1.418-.089.745-1.211c-.055-.09-.394-.827-2.03-2.338-1.717-1.59-1.486-1.332.58-4.081 1.251-1.7 1.751-2.737 1.595-3.183-.148-.422-1.063-.31-1.063-.31l-3.067.019s-.227-.031-.395.071c-.163.099-.267.329-.267.329s-.479 1.273-1.117 2.357c-1.346 2.295-1.885 2.416-2.103 2.274-.512-.342-.384-1.375-.384-2.111 0-2.293.348-3.249-.678-3.497-.34-.082-.59-.136-1.46-.145-1.117-.011-2.063.004-2.598.212-.357.14-.632.453-.465.472.207.023.676.127.923.466.32.434.309 1.41.309 1.41s.184 2.72-.43 3.058c-.422.23-.999-.239-2.24-2.383-.635-1.092-1.115-2.3-1.115-2.3s-.093-.227-.26-.349c-.201-.145-.481-.191-.481-.191l-2.915.019s-.438.013-.599.204c-.144.17-.011.522-.011.522s2.286 5.356 4.872 8.059c2.371 2.475 5.069 2.312 5.069 2.312h1.218z" />
    </svg>
  );
}
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import {
  AVITO_URL,
  CITY,
  DISPATCH_LABEL,
  DISPATCH_TEXT,
  TELEGRAM_URL,
  VK_URL,
} from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.1)_0%,_transparent_50%)]" />
      <div className="pointer-events-none absolute -right-32 top-20 h-64 w-64 rounded-full bg-[#2AABEE]/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <p className="glass-chip mb-4 inline-flex items-center gap-2 px-4 py-1.5 text-sm text-accent">
            <MapPin className="h-4 w-4" />
            Выкуп iPhone в {CITY} — честная цена за 5 минут
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Продайте iPhone в Чите{" "}
            <span className="bg-gradient-to-r from-accent to-[#f5e6a8] bg-clip-text text-transparent">
              дорого и быстро
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Выкупаем iPhone и технику Apple по рыночной цене. Оценка онлайн,
            выезд курьера {DISPATCH_TEXT} по всему городу. Деньги сразу — наличными
            или на карту.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="#form">Оценить iPhone бесплатно</a>
            </Button>
            <Button size="lg" variant="telegram" asChild>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Send className="h-4 w-4" />
                Написать в Telegram
              </a>
            </Button>
            <Button size="lg" variant="avito" asChild>
              <a href={AVITO_URL} target="_blank" rel="noopener noreferrer">
                Наш Авито
              </a>
            </Button>
            <Button size="lg" variant="vk" asChild>
              <a href={VK_URL} target="_blank" rel="noopener noreferrer">
                <VkIcon className="h-4 w-4" />
                ВКонтакте
              </a>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Clock,
                title: `${DISPATCH_LABEL} по Чите`,
                text: "Выезжаем в любой район города",
              },
              {
                icon: ShieldCheck,
                title: "Безопасная сделка",
                text: "Проверка IMEI, прозрачный договор",
              },
              {
                icon: Zap,
                title: "Моментальная оплата",
                text: "Деньги в день обращения",
              },
            ].map((item) => (
              <div key={item.title} className="glass-panel flex items-start gap-3 p-4">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
