import { KeywordInfo, MusicInfo } from '@/components/post/create/types';
import axios from 'axios';

const Address = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const getMusicData = async (keywords: KeywordInfo) => {
  try {
    const response = await axios.get(`${Address}/search`, {
      params: {
        term: keywords.trackName,
        country: 'KR',
        limit: 100,
        media: 'music',
      },
    });

    if (response.data.results.length > 0) {
      const newResult = response.data.results
        .filter((result: MusicInfo) => result.artistName === keywords.artistName)
        .sort((a: MusicInfo, b: MusicInfo) => a.trackName.length - b.trackName.length);

      return newResult;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
