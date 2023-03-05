import { PostInfo } from '../post/types';

export interface MyPostAPI {
  success: boolean;
  message: string;
  data: {
    myPosts: PostInfo[];
  };
}

export interface ProfileAPI {
  success: boolean;
  message: string;
  data: UserInfo;
}

export interface UserInfo {
  nickname: string;
  profileImageUrl: string;
  ranking: number;
  victoryPoint: number;
  victoryCount: number;
  countOfChanllenge?: number;
}
