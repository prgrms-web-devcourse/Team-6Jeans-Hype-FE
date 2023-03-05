import { GenreInfo, PostInfo } from '../post/types';

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
export interface MyBattleAPI {
  success: boolean;
  message: string;
  data: {
    battles: BattleInfo[];
  };
}

export interface BattleInfo {
  battleId: number;
  genre: GenreInfo;
  challenging: Battle;
  challenged: Battle;
  battleStatus: 'PROGRESS' | 'END';
}

export interface Battle {
  title: string;
  singer: string;
  albumUrl: string;
  nickname: string;
}
