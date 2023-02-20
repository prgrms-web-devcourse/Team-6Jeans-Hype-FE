import axios from 'axios';

const Address = 'https://shazam.p.rapidapi.com';

export const getMusicData = async (keyword: string) => {
  try {
    const response = await axios.get(`${Address}/search`, {
      params: { term: keyword, locale: 'ko-KR', limit: 5 },
      headers: {
        'X-RapidAPI-Key': '05596fce87msh116c297d3aa4debp16c879jsne5ba6ba0e0b5',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
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
        'X-RapidAPI-Key': '05596fce87msh116c297d3aa4debp16c879jsne5ba6ba0e0b5',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
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
