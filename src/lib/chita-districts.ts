/** Районы выкупа — стилизованная SVG-карта Читы */
export interface ServiceDistrict {
  id: string;
  name: string;
  color: string;
  /** SVG path (viewBox 0 0 800 520) */
  path: string;
  labelX: number;
  labelY: number;
  description: string;
}

export const SERVICE_DISTRICTS: ServiceDistrict[] = [
  {
    id: "central",
    name: "Центральный",
    color: "#d4af37",
    path: "M 340 210 C 360 190, 420 185, 460 200 C 490 215, 495 250, 475 280 C 450 305, 400 310, 360 295 C 320 280, 310 240, 340 210 Z",
    labelX: 400,
    labelY: 252,
    description: "Центр города, Lenin Square, главные улицы",
  },
  {
    id: "severny",
    name: "Северный",
    color: "#2AABEE",
    path: "M 280 80 C 340 55, 480 50, 540 75 C 580 95, 590 140, 560 175 C 520 200, 460 195, 400 175 C 340 155, 260 130, 280 80 Z",
    labelX: 420,
    labelY: 128,
    description: "Северные микрорайоны, Авиаторов, Южный",
  },
  {
    id: "chernovsky",
    name: "Черновский",
    color: "#34c759",
    path: "M 120 280 C 150 240, 220 230, 280 255 C 310 270, 320 320, 290 360 C 250 400, 180 395, 140 360 C 100 330, 90 310, 120 280 Z",
    labelX: 210,
    labelY: 318,
    description: "Западная часть, микрорайоны у леса",
  },
  {
    id: "ingodinsky",
    name: "Ингодинский",
    color: "#bf5af2",
    path: "M 480 220 C 530 200, 620 210, 680 250 C 720 280, 710 340, 660 380 C 600 410, 520 395, 480 360 C 450 330, 440 260, 480 220 Z",
    labelX: 580,
    labelY: 310,
    description: "Восточная часть города",
  },
];

export const EXTRA_DISTRICTS = [
  "Железнодорожный",
  "Каштак",
  "Аэропорт",
  "Посёлок Смоленка",
] as const;
