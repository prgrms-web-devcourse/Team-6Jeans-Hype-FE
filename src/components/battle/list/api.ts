import { z } from 'zod';

import { axiosInstance } from '@/api';

import { BattleStatusValue } from '../types';
import { Battle, GenreValue } from './types';

const battleMusicResponseScheme = z.object({
  albumUrl: z.string(),
  singer: z.string(),
  title: z.string(),
  isWin: z.boolean(),
});
const battleResponseScheme = z.object({
  battleId: z.number(),
  challenged: battleMusicResponseScheme,
  challenging: battleMusicResponseScheme,
  genre: z.object({ genreName: z.string(), genreValue: z.string() }),
  isProgress: z.boolean(),
});
type BattleResponse = z.infer<typeof battleResponseScheme>;

export const getBattleList = async ({
  genre,
  status,
}: {
  genre?: GenreValue;
  status: BattleStatusValue;
}): Promise<Battle<typeof status>[]> => {
  const { data } = await axiosInstance.request({
    method: 'GET',
    url: `/battles`,
    params: { genre, battleStatus: status },
  });
  return data.data.battles.map((unsafeBattle: BattleResponse) => {
    const parsed = battleResponseScheme.safeParse(unsafeBattle);
    if (!parsed.success) {
      throw parsed.error;
    }
    const { data: battle } = parsed;
    return {
      id: battle.battleId,
      challenged: {
        albumCoverImage: battle.challenged.albumUrl,
        title: battle.challenged.title,
        singer: battle.challenged.singer,
        isWin: battle.isProgress ? undefined : battle.challenged.isWin,
      },
      challenging: {
        albumCoverImage: battle.challenging.albumUrl,
        title: battle.challenging.title,
        singer: battle.challenging.singer,
        isWin: battle.isProgress ? undefined : battle.challenging.isWin,
      },
      battleStatus: battle.isProgress ? 'PROGRESS' : 'END',
      genre: battle.genre.genreName,
    };
  });
};
