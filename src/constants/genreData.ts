export const GENRES = [
  '힙합 / 랩',
  '락 / 메탈',
  '인디 / 어쿠스틱',
  '발라드',
  '트로트',
  'K-POP',
  'R&B',
  '재즈',
  'J-POP',
  '클래식',
  'EDM',
  'POP',
  '기타',
] as const;

export const GENRES_WITH_ALL = ['ALL', ...GENRES] as const;
