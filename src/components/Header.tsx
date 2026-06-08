"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, Phone, X, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AVITO_URL,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_RAW,
  SITE_NAME,
  TELEGRAM_URL,
  VK_URL,
} from "@/lib/constants";

function VkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.653 0-.352.005-2.235.005-2.235s0-1.62.733-1.858c.747-.244 1.706 1.545 2.724 2.228.767.512 1.347.399 1.347.399l2.715-.039s1.418-.089.745-1.211c-.055-.09-.394-.827-2.03-2.338-1.717-1.59-1.486-1.332.58-4.081 1.251-1.7 1.751-2.737 1.595-3.183-.148-.422-1.063-.31-1.063-.31l-3.067.019s-.227-.031-.395.071c-.163.099-.267.329-.267.329s-.479 1.273-1.117 2.357c-1.346 2.295-1.885 2.416-2.103 2.274-.512-.342-.384-1.375-.384-2.111 0-2.293.348-3.249-.678-3.497-.34-.082-.59-.136-1.46-.145-1.117-.011-2.063.004-2.598.212-.357.14-.632.453-.465.472.207.023.676.127.923.466.32.434.309 1.41.309 1.41s.184 2.72-.43 3.058c-.422.23-.999-.239-2.24-2.383-.635-1.092-1.115-2.3-1.115-2.3s-.093-.227-.26-.349c-.201-.145-.481-.191-.481-.191l-2.915.019s-.438.013-.599.204c-.144.17-.011.522-.011.522s2.286 5.356 4.872 8.059c2.371 2.475 5.069 2.312 5.069 2.312h1.218z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  const mobileMenu =
    mounted && open
      ? createPortal(
          <>
            <div
              className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm md:hidden"
              onClick={close}
              aria-hidden
            />
            <nav
              className="fixed left-0 right-0 top-16 z-[201] max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-white/10 bg-[#0a0a0a] px-4 py-4 pb-8 shadow-2xl md:hidden"
              aria-label="Мобильное меню"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-4 py-3.5 text-base text-foreground active:bg-white/10"
                  onClick={close}
                >
                  {link.label}
                </a>
              ))}

              <div className="my-3 border-t border-white/10" />

              <a
                href={`tel:${PHONE_RAW.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-foreground active:bg-white/10"
                onClick={close}
              >
                <Phone className="h-5 w-5 text-accent" />
                {PHONE_DISPLAY}
              </a>

              <div className="mt-4 flex flex-col gap-2">
                <Button variant="telegram" className="w-full" asChild>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                  >
                    Telegram
                  </a>
                </Button>
                <Button variant="vk" className="w-full" asChild>
                  <a
                    href={VK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                  >
                    <VkIcon className="h-4 w-4" />
                    ВКонтакте
                  </a>
                </Button>
                <Button variant="avito" className="w-full" asChild>
                  <a
                    href={AVITO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                  >
                    Наш Авито
                  </a>
                </Button>
              </div>
            </nav>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <header className="glass-header sticky top-0 z-[150]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground"
            onClick={close}
          >
            <Apple className="h-7 w-7 text-accent" />
            <span className="hidden sm:inline">{SITE_NAME}</span>
            <span className="sm:hidden">Apple Чита</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${PHONE_RAW.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <Phone className="h-4 w-4 text-accent" />
              {PHONE_DISPLAY}
            </a>
            <Button variant="telegram" size="sm" asChild>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground active:bg-white/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
