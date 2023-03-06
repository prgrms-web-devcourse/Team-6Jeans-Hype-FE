import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import MusicListSkeleton from '@/components/common/skeleton/MusicListSkeleton';
import { COLOR } from '@/constants/color';

import Card from '../../common/MusicCard';
import { getMusicData } from '../api';
import { Music } from './types';

interface Props {
  onClickInMusicList(trackId: number): void;
  keyword: string;
}

function MusicList({ onClickInMusicList, keyword }: Props) {
  const { data: musicList, isLoading } = useQuery(['musicList', keyword], () => getMusicData(keyword), {
    enabled: !!keyword,
  });

  if (isLoading) {
    return (
      <MusicListContainer>
        <MusicListSkeleton />
        <MusicListSkeleton />
        <MusicListSkeleton />
      </MusicListContainer>
    );
  }

  return (
    <MusicListContainer>
      <Header>검색 결과</Header>
      <MusicCardContainer>
        {musicList?.length ? (
          musicList?.map((music: Music) => (
            <Card key={music.trackId} music={music} onClickMusicList={() => onClickInMusicList(music.trackId)} />
          ))
        ) : (
          <EmptyResult>결과가 없습니다. 다른 검색어로 검색해보세요</EmptyResult>
        )}
      </MusicCardContainer>
    </MusicListContainer>
  );
}
export default memo(MusicList, (prev, next) => JSON.stringify(prev.keyword) === JSON.stringify(next.keyword));

const Header = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  padding-left: 0.8rem;
  margin-bottom: 1rem;
`;

const MusicListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const MusicCardContainer = styled.div`
  height: calc(100vh - 22rem);
  overflow-y: scroll;
  border-radius: 1rem;
`;

const EmptyResult = styled.div`
  position: relative;
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 1.3rem;
  color: ${COLOR.gray};
`;
