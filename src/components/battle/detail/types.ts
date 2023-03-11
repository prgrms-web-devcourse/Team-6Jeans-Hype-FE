export interface Battles {
  isProgress: boolean;
  battleId: number;
  battleGenre: GenreInfo;
  challenged: BattleDetail;
  challenging: BattleDetail;
}

export interface BattleDetail {
  postId: number;
  music: Music;
  voteCnt?: number;
}

export interface Music {
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
