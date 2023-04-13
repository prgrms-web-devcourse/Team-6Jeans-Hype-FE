import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import NoContent from '@/components/common/NoContent';
import MusicListSkeleton from '@/components/common/skeleton/MusicListSkeleton';

import Card from '../../common/MusicCard';
import { getMusicData } from './api';
import { Music } from './types';

interface Props {
  onClickInMusicList(trackId: number): void;
  keyword: string;
}

function MusicList({ onClickInMusicList, keyword }: Props) {
  const { data: musicList, isLoading } = useQuery<Music[]>(['musicList', keyword], () => getMusicData(keyword), {
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
          <Container>
            <NoContent text='검색 결과가 존재하지 않습니다.' isImage width={8} />
          </Container>
        )}
      </MusicCardContainer>
    </MusicListContainer>
  );
}
export default memo(MusicList, (prev, next) => JSON.stringify(prev.keyword) === JSON.stringify(next.keyword));

const Header = styled.div`
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
  overflow-y: auto;
  border-radius: 1rem;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;
