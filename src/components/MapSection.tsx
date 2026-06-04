"use client";

import { useState } from "react";
import { Clock, MapPin, Truck } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import {
  EXTRA_DISTRICTS,
  SERVICE_DISTRICTS,
  type ServiceDistrict,
} from "@/lib/chita-districts";
import { CITY, DISPATCH_LABEL, DISPATCH_TEXT } from "@/lib/constants";
import { cn } from "@/lib/utils";

function DistrictPath({
  district,
  active,
  dimmed,
  onSelect,
}: {
  district: ServiceDistrict;
  active: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <g
      className="cursor-pointer transition-opacity duration-300"
      style={{ opacity: dimmed ? 0.35 : 1 }}
      onClick={onSelect}
      onMouseEnter={onSelect}
      role="button"
      tabIndex={0}
      aria-label={district.name}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect();
      }}
    >
      <path
        d={district.path}
        fill={district.color}
        fillOpacity={active ? 0.45 : 0.22}
        stroke={district.color}
        strokeWidth={active ? 2.5 : 1.5}
        strokeOpacity={active ? 1 : 0.65}
        className="transition-all duration-300"
        style={{
          filter: active
            ? `drop-shadow(0 0 18px ${district.color}88)`
            : undefined,
        }}
      />
      <text
        x={district.labelX}
        y={district.labelY}
        textAnchor="middle"
        className="pointer-events-none select-none fill-white text-[13px] font-semibold"
        style={{
          textShadow: "0 1px 8px rgba(0,0,0,0.9)",
          opacity: active || !dimmed ? 1 : 0.6,
        }}
      >
        {district.name}
      </text>
    </g>
  );
}

export function MapSection() {
  const [activeId, setActiveId] = useState<string>(SERVICE_DISTRICTS[0].id);

  return (
    <section id="map" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Районы выкупа в {CITY}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Выезжаем {DISPATCH_TEXT} — наведите на район или выберите из списка
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="glass-panel mt-10 overflow-hidden rounded-3xl">
            <div className="grid lg:grid-cols-2">
              {/* SVG-карта */}
              <div className="relative min-h-[340px] bg-[#0d0d0f] p-4 sm:p-6 lg:min-h-[480px]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_65%)]" />

                <svg
                  viewBox="0 0 800 520"
                  className="relative z-10 h-full w-full"
                  aria-label={`Карта районов ${CITY}`}
                >
                  <defs>
                    <radialGradient id="city-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                    </radialGradient>
                    <filter id="pulse-blur">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Фоновое свечение центра */}
                  <ellipse cx="400" cy="260" rx="180" ry="140" fill="url(#city-glow)" />

                  {SERVICE_DISTRICTS.map((d) => (
                    <DistrictPath
                      key={d.id}
                      district={d}
                      active={activeId === d.id}
                      dimmed={activeId !== d.id}
                      onSelect={() => setActiveId(d.id)}
                    />
                  ))}

                  {/* Центр города */}
                  <g filter="url(#pulse-blur)">
                    <circle cx="400" cy="252" r="6" fill="#d4af37">
                      <animate
                        attributeName="r"
                        values="5;8;5"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="1;0.5;1"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                  <circle cx="400" cy="252" r="3" fill="#fff" />

                  <text
                    x="400"
                    y="468"
                    textAnchor="middle"
                    className="fill-white/30 text-[11px] font-medium tracking-widest uppercase"
                  >
                    г. {CITY}
                  </text>
                </svg>
              </div>

              {/* Панель районов */}
              <div className="flex flex-col justify-between border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0">
                <div>
                  <div className="mb-6 flex items-center gap-2 text-accent">
                    <MapPin className="h-5 w-5" />
                    <span className="font-semibold">Зоны бесплатного выезда</span>
                  </div>

                  <div className="space-y-2">
                    {SERVICE_DISTRICTS.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setActiveId(d.id)}
                        onMouseEnter={() => setActiveId(d.id)}
                        className={cn(
                          "flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-200",
                          activeId === d.id
                            ? "border-white/20 bg-white/8 shadow-lg"
                            : "border-transparent bg-white/3 hover:bg-white/6",
                        )}
                        style={
                          activeId === d.id
                            ? {
                                boxShadow: `0 4px 24px ${d.color}22`,
                                borderColor: `${d.color}55`,
                              }
                            : undefined
                        }
                      >
                        <span
                          className="h-10 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: d.color }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground">{d.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {d.description}
                          </p>
                        </div>
                        {activeId === d.id && (
                          <span
                            className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                            style={{
                              backgroundColor: `${d.color}22`,
                              color: d.color,
                            }}
                          >
                            {DISPATCH_LABEL}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                    Также выезжаем:{" "}
                    {EXTRA_DISTRICTS.join(", ")} — укажите адрес в заявке.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { icon: Clock, label: "Выезд", value: DISPATCH_LABEL },
                    { icon: Truck, label: "Курьер", value: "Бесплатно" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/8 bg-white/4 px-4 py-3"
                    >
                      <item.icon className="mb-1.5 h-4 w-4 text-accent" />
                      <p className="text-[11px] text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
