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
