import { BATTLE_STATUS_NAME_LIST, BATTLE_STATUS_VALUE_LIST } from './constants';

export interface Battles {
  battleId: number;
  battleGenre: GenreInfo;
  challenged: BattleDetail;
  challenging: BattleDetail;
}

export interface BattleDetail {
  postId: number;
  music: BattleMusic;
}

export interface BattleMusic {
  musicId?: number;
  title: string;
  musicUrl?: string;
  albumCoverUrl: string;
  singer: string;
  genre?: GenreInfo;
}

export interface GenreInfo {
  genreValue: string;
  genreName: string;
}

export interface Vote {
  title: string;
  albumCoverUrl: string;
  selectedPostVoteCnt: number;
  oppositePostVoteCnt: number;
}

export type BattleStatusName = typeof BATTLE_STATUS_NAME_LIST[number];

export type BattleStatusValue = typeof BATTLE_STATUS_VALUE_LIST[number];
