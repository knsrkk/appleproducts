import { ExternalLink, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { AVITO_REVIEWS_COUNT, AVITO_URL, REVIEWS } from "@/lib/constants";

export function Reviews() {
  return (
    <section id="reviews" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Отзывы клиентов из Читы
          </h2>
        </FadeIn>

        <FadeIn delay={60}>
          <div className="glass-panel mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-[#00AAFF]/25 bg-[#00AAFF]/5 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#00AAFF]/15 text-2xl font-bold text-[#00AAFF]">
              {AVITO_REVIEWS_COUNT}+
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">
                Более {AVITO_REVIEWS_COUNT} положительных оценок на Авито
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Реальные отзывы покупателей и продавцов — проверьте нашу репутацию
                перед сделкой
              </p>
            </div>
            <Button variant="avito" asChild className="shrink-0">
              <a href={AVITO_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Авито
              </a>
            </Button>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.name} delay={i * 80}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="mt-4 font-medium text-foreground">
                    {review.name}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
