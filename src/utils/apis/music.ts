import axios from 'axios';

const Address = 'https://shazam.p.rapidapi.com';

export const getMusicData = async (keyword: string) => {
  try {
    const res = await axios.get(`${Address}/search`, {
      params: { term: keyword, locale: 'ko-KR' },
      headers: {
        'X-RapidAPI-Key': '05596fce87msh116c297d3aa4debp16c879jsne5ba6ba0e0b5',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
      },
    });
    if (res.data.tracks) {
      return res.data.tracks.hits;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
