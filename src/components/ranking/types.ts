export interface UserRanking {
  duration: FromTo;
  ranking: Ranking[];
}

export interface FromTo {
  fromDate: string;
  toDate: string;
}

export interface Ranking {
  memberId: number;
  memberNickname: string;
  memberPoint: number;
  memberRanking: number;
}

export interface MyRanking {
  nickname: string;
  ranking: number;
}
