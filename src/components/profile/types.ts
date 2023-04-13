export interface UserInfo {
  nickname: string;
  profileImageUrl: string;
  ranking: number;
  victoryPoint: number;
  victoryCount: number;
  countOfChanllenge?: number;
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

export interface GenreInfo {
  genreValue: string;
  genreName: string;
}
