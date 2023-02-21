import axios from 'axios';

const Address = process.env.NEXT_PUBLIC_API_ENDPOINT;
const key = process.env.NEXT_PUBLIC_API_KEY;
const host = process.env.NEXT_PUBLIC_API_Host;

export const getMusicData = async (keyword: string) => {
  try {
    const response = await axios.get(`${Address}/search`, {
      params: { term: keyword, locale: 'ko-KR' },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': host,
      },
    });
    if (response.data.tracks) {
      return response.data.tracks.hits;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMusicDetailData = async (id: string) => {
  try {
    const response = await axios.get(`${Address}/songs/v2/get-details`, {
      params: { id, l: 'ko-KR' },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': host,
      },
    });
    if (response.data.data.length) {
      return response.data.data[0];
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
