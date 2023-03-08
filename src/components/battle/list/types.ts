import { BattleStatusValue } from '../types';
import { GENRE_NAME_LIST, GENRE_VALUE_LIST } from './constants';

export interface BattleMusic {
  albumCoverImage: string;
  title: string;
  singer: string;
}

export interface FinishedBattleMusic extends BattleMusic {
  isWin: boolean;
}
export interface Battle<T extends BattleStatusValue> {
  challenged: T extends 'PROGRESS' ? BattleMusic : FinishedBattleMusic;
  challenging: T extends 'PROGRESS' ? BattleMusic : FinishedBattleMusic;
  id: number;
  battleStatus: T;
  genre: GenreName;
}

export type GenreName = typeof GENRE_NAME_LIST[number];

export type GenreValue = typeof GENRE_VALUE_LIST[number];

export const isGenreValue = (name: string): name is GenreValue => {
  return GENRE_VALUE_LIST.includes(name as GenreValue);
};
