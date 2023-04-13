import { axiosInstance } from '@/api/index';

export const getRandomBattleAlbumCoverImage = async () => {
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
