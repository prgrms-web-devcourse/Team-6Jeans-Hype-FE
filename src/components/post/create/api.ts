import { axiosInstance } from '@/api';

import { Values } from '../create/types';

const ADDRESS = process.env.NEXT_PUBLIC_MUSIC_SEARCH_API_URL;

export const getMusicDetailData = async (trackId: string) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${ADDRESS}/lookup`,
      params: {
        id: trackId,
        country: 'KR',
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0];
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const getGenres = async () => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/genres`,
    });

    if (response.data.success) {
      return response.data.data.genres;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async (data: Values) => {
  try {
    const { battleAvailability, description, musicInfo, selectedGenre } = data;

    const body = {
      musicId: musicInfo.trackId,
      title: musicInfo.trackName,
      musicUrl: musicInfo.previewUrl,
      albumCoverUrl: musicInfo.artworkUrl100,
      singer: musicInfo.artistName,
      genre: selectedGenre,
      isBattlePossible: battleAvailability,
      content: description,
    };

    const response = await axiosInstance.request({
      method: 'POST',
      url: `/posts`,
      data: body,
    });
    if (response.data.success) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
