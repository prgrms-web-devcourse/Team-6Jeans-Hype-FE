export interface PostDetailInfo {
  music: MusicInfo;
  likeCount: number;
  isBattlePossible: boolean;
  nickname: string;
  content?: string;
}

export interface MusicInfo {
  musicName: string;
  musicUrl: string;
  thumbnailUrl: string;
  singer: string;
  genre: GenreInfo;
}

export interface GenreInfo {
  genreValue: string;
  genreName: string;
}
