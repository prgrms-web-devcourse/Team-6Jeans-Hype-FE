export interface PostDetail {
  music: Music;
  likeCount: number;
  isBattlePossible: boolean;
  nickname: string;
  content?: string;
}

export interface Music {
  musicName: string;
  musicUrl: string;
  thumbnailUrl: string;
  singer: string;
  genre: Genre;
}

export interface Genre {
  genreValue: string;
  genreName: string;
}
