import axios from 'axios';

const Address = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const getMusicData = async (keyword: string) => {
  try {
    const response = await axios.get(`${Address}/search`, {
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
    const response = await axios.get(`${Address}/lookup`, {
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
