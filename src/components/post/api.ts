import axios from 'axios';

import { axiosInstance } from '@/api';

import { Music, Values } from './create/types';
import { PostAPI } from './types';

const ADDRESS = process.env.NEXT_PUBLIC_MUSIC_SEARCH_API_URL;

export const getPostFeedData = async (genre: string) => {
  try {
    const { data } = await axiosInstance.request<PostAPI>({
      method: 'GET',
      url: `/posts`,
      params: {
        genre,
      },
    });

    if (data.success) {
      return data.data.posts;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMusicData = async (keyword: string) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/music/search`,
      params: {
        term: keyword,
      },
    });

    if (data.success) {
      const filteredData = data.data.results.filter((result: Music) => result.artistName !== '코케');

      return filteredData;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

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
