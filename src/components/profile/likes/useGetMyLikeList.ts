import { useQuery } from '@tanstack/react-query';

import { getLikePostList } from '../api';

export const useGetMyLikeList = (genre?: string, limit?: number) => {
  return useQuery(['myLikePostList', genre, limit], () => getLikePostList(genre, limit));
};
