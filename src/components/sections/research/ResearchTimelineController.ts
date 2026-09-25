export const RESEARCH_CHAPTERS = {
  signal: [0.00, 0.12] as const,
  traffic: [0.12, 0.25] as const,
  detection: [0.25, 0.40] as const,
  fusion: [0.40, 0.52] as const,
  result: [0.52, 0.65] as const,
  agesify: [0.65, 0.78] as const,
  cloud: [0.78, 0.90] as const,
  final: [0.90, 1.00] as const,
};

export type ChapterKey = keyof typeof RESEARCH_CHAPTERS;

export interface ChapterInfo {
  index: number;
  id: ChapterKey;
  numStr: string;
  title: string;
  range: readonly [number, number];
}

export const CHAPTER_LIST: ChapterInfo[] = [
  { index: 1, id: 'signal', numStr: '01', title: 'SIGNAL', range: [0.00, 0.12] },
  { index: 2, id: 'traffic', numStr: '02', title: 'TRAFFIC', range: [0.12, 0.25] },
  { index: 3, id: 'detection', numStr: '03', title: 'DETECTION', range: [0.25, 0.40] },
  { index: 4, id: 'fusion', numStr: '04', title: 'FUSION', range: [0.40, 0.52] },
  { index: 5, id: 'result', numStr: '05', title: 'RESULT', range: [0.52, 0.65] },
  { index: 6, id: 'agesify', numStr: '06', title: 'AGESIFY', range: [0.65, 0.78] },
  { index: 7, id: 'cloud', numStr: '07', title: 'CLOUD', range: [0.78, 0.90] },
  { index: 8, id: 'final', numStr: '08', title: 'DEFENSE', range: [0.90, 1.00] },
];

export function getActiveChapter(progress: number): ChapterInfo {
  const p = Math.max(0, Math.min(0.9999, progress));
  for (const ch of CHAPTER_LIST) {
    if (p >= ch.range[0] && p < ch.range[1]) {
      return ch;
    }
  }
  return CHAPTER_LIST[CHAPTER_LIST.length - 1];
}

export function getSubProgress(progress: number, range: readonly [number, number]): number {
  if (progress <= range[0]) return 0;
  if (progress >= range[1]) return 1;
  return (progress - range[0]) / (range[1] - range[0]);
}

/**
 * Smooth Hermite / S-curve cubic interpolation
 */
export function smoothStep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/**
 * Smoother quintic Hermite interpolation (zero 1st & 2nd derivatives at endpoints)
 * Eliminates acceleration jerks at start and end of transitions.
 */
export function smootherStep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * c * (c * (c * 6 - 15) + 10);
}

