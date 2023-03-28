import { z } from 'zod';

import { axiosInstance } from '@/api';
import { Battle, GenreValue } from '@/components/battle/List/types';

import { BattleStatusValue } from '../../battle/types';

const battleMusicResponseScheme = z.object({
  albumUrl: z.string(),
  singer: z.string(),
  title: z.string(),
  nickname: z.string(),
  isWin: z.boolean(),
});
const battleResponseScheme = z.object({
  battleId: z.number(),
  challenged: battleMusicResponseScheme,
  challenging: battleMusicResponseScheme,
  genre: z.object({ genreName: z.string(), genreValue: z.string() }),
  battleStatus: z.string(),
});
type BattleResponse = z.infer<typeof battleResponseScheme>;

export const getMyBattleList = async ({
  genre,
  limit,
  memberId,
  status,
}: {
  genre?: GenreValue;
  limit?: number;
  memberId?: number;
  status?: BattleStatusValue;
}): Promise<Battle<BattleStatusValue>[]> => {
  const { data } = await axiosInstance.request({
    method: 'GET',
    url: `/members/battles`,
    params: { genre, limit, memberId, battleStatus: status },
  });
  return data.data.battles.map((unsafeBattle: BattleResponse) => {
    const parsed = battleResponseScheme.safeParse(unsafeBattle);
    if (!parsed.success) {
      throw parsed.error;
    }
    const { data: battle } = parsed;
    const isProgress = battle.battleStatus === 'PROGRESS';
    return {
      id: battle.battleId,
      challenged: {
        albumCoverImage: battle.challenged.albumUrl,
        title: battle.challenged.title,
        singer: battle.challenged.singer,
        isWin: isProgress ? undefined : battle.challenged.isWin,
      },
      challenging: {
        albumCoverImage: battle.challenging.albumUrl,
        title: battle.challenging.title,
        singer: battle.challenging.singer,
        isWin: isProgress ? undefined : battle.challenging.isWin,
      },
      battleStatus: isProgress ? 'PROGRESS' : 'END',
      genre: battle.genre.genreName,
    };
  });
};
