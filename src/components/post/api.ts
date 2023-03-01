import { axiosInstance } from '@/api';
import axios from 'axios';
import { PostAPI } from './types';

import { Values } from './create/types';

const ADDRESS = process.env.NEXT_PUBLIC_MUSIC_SEARCH_API_URL;
const SERVER = process.env.NEXT_PUBLIC_API_URL;

const TEMP_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNjc3NDg1MTUwLCJleHAiOjE2NzgzNDkxNTB9.1UtakWRXOkrN-IGZ7V7fWh0YhC4WzBS6M31FxTnPceKLW-IqvD8sTVlQIDEDfmbqxDdqqWnOVH4i0i0k1KuYlg';

interface Props {
  genre: string;
  isPossibleBattle?: boolean;
}

export const getPostFeedData = async ({ genre, isPossibleBattle }: Props) => {
  try {
    const { data } = await axiosInstance.request<PostAPI>({
      method: 'GET',
      url: `${SERVER}/posts`,
      params: {
        genre,
        possible: isPossibleBattle,
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
    const response = await axios.get(`${ADDRESS}/search`, {
      params: {
        term: keyword,
        country: 'KR',
        limit: 500,
        media: 'music',
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMusicDetailData = async (trackId: string) => {
  try {
    const response = await axios.get(`${ADDRESS}/lookup`, {
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
    const response = await axios.get(`${SERVER}/genres`);

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
      musicName: musicInfo.trackName,
      musicUrl: musicInfo.previewUrl,
      albumCoverUrl: musicInfo.artworkUrl100,
      singer: musicInfo.artistName,
      genre: selectedGenre,
      isBattlePossible: battleAvailability,
      content: description,
    };

    //로그인 되면 교체될 부분입니다
    const response = await axios.post(
      `${SERVER}/posts`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${TEMP_TOKEN}`,
        },
      },
    );
    console.log(response);
    if (response.data.success) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
