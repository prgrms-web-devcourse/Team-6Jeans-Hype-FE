import { GenreName, GenreValue } from './types';

export const GENRE_VALUE_MAP: Record<GenreName, GenreValue> = {
  '힙합/랩': 'HIPHOP_RAP',
  '락/메탈': 'ROCK_METAL',
  '인디/어쿠스틱': 'INDIE_ACOUSTIC',
  '발라드': 'BALLAD',
  '트로트': 'TROT',
  'K-POP': 'K_POP',
  'R&B': 'R_AND_B',
  '재즈': 'JAZZ',
  'J-POP': 'J_POP',
  '클래식': 'CLASSIC',
  'EDM': 'EDM',
  'POP': 'POP',
  '기타': 'ETC',
};

export const GENRE_NAME_LIST = [
  '힙합/랩',
  '락/메탈',
  '인디/어쿠스틱',
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

export const GENRE_VALUE_LIST = [
  'HIPHOP_RAP',
  'ROCK_METAL',
  'BALLAD',
  'CLASSIC',
  'EDM',
  'ETC',
  'INDIE_ACOUSTIC',
  'JAZZ',
  'J_POP',
  'K_POP',
  'POP',
  'R_AND_B',
  'TROT',
] as const;
