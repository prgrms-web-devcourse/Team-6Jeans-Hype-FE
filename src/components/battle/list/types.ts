import { GENRE_NAME_LIST, GENRE_VALUE_LIST } from './constants';

export interface BattleMusic {
  albumCoverImage: string;
  title: string;
  singer: string;
}

export interface Battle {
  challenged: BattleMusic;
  challenging: BattleMusic;
  id: number;
  isProgress: boolean;
  genre: GenreName;
}

export type GenreName = typeof GENRE_NAME_LIST[number];

export type GenreValue = typeof GENRE_VALUE_LIST[number];

export const isGenreValue = (name: string): name is GenreValue => {
  return GENRE_VALUE_LIST.includes(name as GenreValue);
};
