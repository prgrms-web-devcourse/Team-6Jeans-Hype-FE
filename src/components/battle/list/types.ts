export interface BattleMusic {
  albumCoverImage: string;
  title: string;
  singer: string;
}

export interface Battle {
  challenged: BattleMusic;
  challenging: BattleMusic;
  id: number;
  isProgress: boolean;
  genre: GenreName;
}

export type GenreName =
  | '힙합/랩'
  | '락/메탈'
  | '인디/어쿠스틱'
  | '발라드'
  | '트로트'
  | 'K-POP'
  | 'R&B'
  | '재즈'
  | 'J-POP'
  | '클래식'
  | 'EDM'
  | 'POP'
  | '기타';
