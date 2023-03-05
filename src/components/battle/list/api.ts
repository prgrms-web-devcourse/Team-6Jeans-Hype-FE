import { z } from 'zod';

import { axiosInstance } from '@/api';

import { Battle, GenreName } from './types';

const battleMusicResponseScheme = z.object({ albumUrl: z.string(), singer: z.string(), title: z.string() });
const battleResponseScheme = z.object({
  battleId: z.number(),
  challenged: battleMusicResponseScheme,
  challenging: battleMusicResponseScheme,
  genre: z.object({ genreName: z.string(), genreValue: z.string() }),
  isProgress: z.boolean(),
});
type BattleResponse = z.infer<typeof battleResponseScheme>;

export const getBattleList = async (genre?: GenreName): Promise<Battle[]> => {
  const { data } = await axiosInstance.request({ method: 'GET', url: `/battles${genre ? `?genre=${genre}` : ''}` });
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
      },
      challenging: {
        albumCoverImage: battle.challenging.albumUrl,
        title: battle.challenging.title,
        singer: battle.challenging.singer,
      },
      isProgress: battle.isProgress,
      genre: battle.genre.genreName,
    };
  });
};
