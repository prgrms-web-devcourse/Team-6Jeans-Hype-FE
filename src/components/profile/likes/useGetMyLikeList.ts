import { useQuery } from '@tanstack/react-query';

import { PostInfo } from '@/components/post/types';

import { getLikePostList } from '../api';

export const useGetMyLikeList = (genre?: string, limit?: number) => {
  return useQuery<PostInfo[]>(['myLikePostList', genre, limit], () => getLikePostList(genre, limit));
};
