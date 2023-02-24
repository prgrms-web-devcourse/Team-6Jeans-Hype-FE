export type Genre =
  | '힙합/랩'
  | '락/메탈'
  | '인디/어쿠스틱'
  | '발라드'
  | '트로트'
  | 'KPOP'
  | 'R&B'
  | '재즈'
  | 'JPOP'
  | '클래식'
  | 'EDM'
  | 'POP'
  | '기타';

export interface Values {
  musicInfo: Music;
  selectedGenre: Genre | undefined;
  description: string;
  battleAvailability: boolean;
}

export interface Music {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
}
