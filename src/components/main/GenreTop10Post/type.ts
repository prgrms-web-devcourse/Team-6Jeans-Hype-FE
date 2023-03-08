export interface GenreTop10PostAPI {
  success: boolean;
  message: string;
  data: {
    posts: GenreTop10PostInfo[];
  };
}

export interface GenreTop10PostInfo {
  postId: number;
  music: MusicInfo;
  likeCount: number;
  isBattlePossible: boolean;
  nickname?: string;
}

export interface MusicInfo {
  title: string;
  albumCoverUrl: string;
  singer: string;
  genre: GenreInfo;
}

export interface GenreInfo {
  genreValue: string;
  genreName: string;
}
