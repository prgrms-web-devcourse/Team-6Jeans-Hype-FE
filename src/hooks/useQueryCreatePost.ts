import { getMusicData } from '@/utils/apis/music';
import { useQuery } from '@tanstack/react-query';

export const getMusicList = (keyword: string) => {
  return useQuery(['keyword', keyword], () => getMusicData(keyword), {
    enabled: !!keyword,
  });
};
