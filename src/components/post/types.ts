export interface PostAPI {
  success: boolean;
  message: string;
  data: {
    posts: PostInfo[];
  };
}

export interface PostInfo {
  postId: number;
  music: MusicInfo;
  likeCount: number;
  isBattlePossible: boolean;
  nickname: string;
}

export interface MusicInfo {
  title: string;
  albumCoverUrl: string;
  singer: string;
  genre: genreInfo;
}

export interface genreInfo {
  genreValue: string;
  genreName: string;
}
