export interface MyBattlePosAPI {
  success: boolean;
  message: string;
  data: {
    posts: MyBattlePostInfo[];
  };
}

export interface PostBattleAPI {
  success: boolean;
  message: string;
  data: PostBattleInfo;
}

export interface MyBattlePostInfo {
  postId: number;
  music: BattleMusic;
}

export interface PostBattleInfo {
  music: BattleMusic;
  likeCount: number;
  isBattlePossible: boolean;
  nickname: string;
  content?: string;
}

export interface BattleMusic {
  musicId?: number;

  title: string;
  musicUrl?: string;
  albumCoverUrl: string;
  singer: string;
  genre?: BattleGenreInfo;
}

export interface BattleGenreInfo {
  genreValue: string;
  genreName: string;
}

export interface BattleApplyModal {
  postId: number;
  title: string;
  musicUrl?: string;
  albumCoverUrl: string;
  singer: string;
}
