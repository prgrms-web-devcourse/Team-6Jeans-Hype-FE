export interface BattleMusic {
  albumCoverImage: string;
  title: string;
  singer: string;
}

export interface Battle {
  left: BattleMusic;
  right: BattleMusic;
}
