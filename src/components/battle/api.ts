import axios from 'axios';

const ADDRESS = process.env.NEXT_PUBLIC_API_ENDPOINT;
const SERVER = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

interface Vote {
  title: string;
  albumCoverUrl: string;
  selectedPostVoteCnt: number;
  oppositePostVoteCnt: number;
}

export const createBattleVote = async (battleId: number, votedPostId: number) => {
  try {
    // const response = await axios.post(`${SERVER}/battles/vote`);

    // if (response.data.success) {
    //   return response.data.data.genres;
    // } else {
    //   return [];
    // }

    const TEMP_DUMMY: Vote = {
      title: '떠나 (Prod. PATEKO (파테코))',
      albumCoverUrl:
        'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/52/6e/b5/526eb565-8444-3ec2-0392-c3ed55feb0b9/cover_KM0015957_1.jpg/100x100bb.jpg',
      selectedPostVoteCnt: 175,
      oppositePostVoteCnt: 253,
    };

    return TEMP_DUMMY;
  } catch (error) {
    console.error(error);
  }
};
