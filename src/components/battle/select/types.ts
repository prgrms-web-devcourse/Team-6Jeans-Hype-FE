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

export interface SelectedBattle {
  battleId: number;
  votedPostId: number;
}
