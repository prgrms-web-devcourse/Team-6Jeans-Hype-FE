export interface PostDetail {
  music: Music;
  likeCount: number;
  isBattlePossible: boolean;
  nickname: string;
  memberId: number;
  content?: string;
}

export interface Music {
  title: string;
  musicUrl?: string;
  albumCoverUrl: string;
  singer: string;
  genre?: Genre;
}

export interface Genre {
  genreValue: string;
  genreName: string;
}
