export interface ListInfo {
  postId: number;
  music: MusicInfo;
  likeCount: number;
  isBattlePossible: boolean;
  nickname: string;
}

export interface MusicInfo {
  musicName: string;
  thumbnailUrl: string;
  singer: string;
  genre: string;
}
