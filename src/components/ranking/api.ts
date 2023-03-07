import { axiosInstance } from '@/api';
import { ProfileAPI } from '../mypage/types';
import { UserRanking } from './types';

export const getUserRanking = async () => {
  try {
    // const response = await axiosInstance.request({
    //   method: 'GET',
    //   url: `/???`,
    //   params:{ limit:??}
    // });

    // if (response.data.success) {
    //   return response.data.data;
    // } else {
    //   return {};
    // }

    const tmpObj: UserRanking = {
      duration: {
        fromDate: '2023-02-28',
        toDate: '2023-03-06',
      },
      ranking: [
        {
          memberId: 1,
          memberNickname: '김성현',
          memberPoint: 9999,
          memberRanking: 1,
        },
        {
          memberId: 2,
          memberNickname: '이수영',
          memberPoint: 2987,
          memberRanking: 2,
        },
        {
          memberId: 3,
          memberNickname: '박세준',
          memberPoint: 2752,
          memberRanking: 3,
        },
        {
          memberId: 4,
          memberNickname: '원다연',
          memberPoint: 2312,
          memberRanking: 4,
        },
        {
          memberId: 5,
          memberNickname: '김소현',
          memberPoint: 1999,
          memberRanking: 5,
        },
        {
          memberId: 6,
          memberNickname: '남주영',
          memberPoint: 1657,
          memberRanking: 6,
        },
        {
          memberId: 7,
          memberNickname: '박민형',
          memberPoint: 1231,
          memberRanking: 7,
        },
        {
          memberId: 8,
          memberNickname: '24글자가최대라고하네요24글자가최대라고하네요',
          memberPoint: 1230,
          memberRanking: 9,
        },
        {
          memberId: 9,
          memberNickname: '갱갱갱',
          memberPoint: 1220,
          memberRanking: 10,
        },
        {
          memberId: 10,
          memberNickname: '렌코쿠 쿄주로',
          memberPoint: 1210,
          memberRanking: 11,
        },
        {
          memberId: 11,
          memberNickname: '피카츄',
          memberPoint: 1200,
          memberRanking: 12,
        },
        {
          memberId: 12,
          memberNickname: '레오나르도 디카프리오',
          memberPoint: 1190,
          memberRanking: 13,
        },
      ],
    };

    return tmpObj;
  } catch (error) {
    console.error(error);
  }
};

export const getMyRanking = async () => {
  try {
    const { data } = await axiosInstance.request<ProfileAPI>({
      method: 'GET',
      url: `members/profile`,
    });
    console.log(data.data);
    if (data.success) {
      //return data.data;
    }

    const tmp = {
      nickname: '김성현',
      ranking: 1,
    };
    return tmp;
  } catch (error) {
    console.error(error);
  }
};
