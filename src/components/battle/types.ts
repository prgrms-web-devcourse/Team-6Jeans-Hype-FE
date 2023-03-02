import { GenreInfo } from '../post/types';

export interface Battles {
  battleId: number;
  battleGenre: GenreInfo;
  challenged: BattleDetail;
  challenging: BattleDetail;
}

export interface BattleDetail {
  postId: number;
  music: Music;
}
export interface Music {
  musicId: string;
  title: string;
  singer: string;
  albumCoverUrl: string;
  musicUrl: string;
  genre: GenreInfo;
}

export interface Vote {
  title: string;
  albumCoverUrl: string;
  selectedPostVoteCnt: number;
  oppositePostVoteCnt: number;
}
