import { axiosInstance } from '@/api/index';

import { RandomBattleAlbumCoverImage } from '.';

export const getRandomBattleAlbumCoverImage = async (): Promise<RandomBattleAlbumCoverImage> => {
  const { data } = await axiosInstance.request({
    method: 'GET',
    url: `/battles/random`,
  });

  return {
    battleId: data.data.battleId,
    challengedAlbumCoverImage: data.data.challenged.music.albumCoverUrl,
    challengingAlbumCoverImage: data.data.challenging.music.albumCoverUrl,
  };
};
