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
  musicName: string;
  musicUrl?: string;
  thumbnailUrl: string;
  singer: string;
  genre?: BattleGenreInfo;
}

export interface BattleGenreInfo {
  genreValue: string;
  genreName: string;
}
