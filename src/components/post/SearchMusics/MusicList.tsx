import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import MusicListSkeleton from '@/components/common/skeleton/MusicList';
import { getMusicData } from '@/utils/apis/music';

import { Music } from './types';

interface Src {
  src: string;
}

const Header = styled.div`
  font-size: 14px;
  color: #242467;
  font-weight: bold;
  margin-left: 10px;
`;

const MusicListContainer = styled.div`
  max-height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  margin-top: 50px;
`;

const MusicCard = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  height: 70px;
  box-shadow: 0px 0px 10px rgba(226, 226, 226, 0.25);
  background-color: #fff;
`;

const ImageContainer = styled.div`
  border-radius: 10px;
  width: 64px;
  height: 64px;
  border: 1px solid #dddddd;
  background-image: ${({ src }: Src) => `url(${src})`};
  background-repeat: no-repeat;
  background-size: 64px 64px;
`;

const MusicTexts = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Text = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
`;

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: bold;
`;
const ArtistName = styled.div`
  color: #9f9f9f;
`;
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
      <>
        <MusicListSkeleton />
        <MusicListSkeleton />
        <MusicListSkeleton />
      </>
    );
  }

  return (
    <MusicListContainer>
      <Header>검색 결과</Header>
      {musicList.length ? (
        musicList?.map((music: Music) => {
          const { trackId, trackName, artistName, artworkUrl100 } = music;

          return (
            <MusicCard
              key={trackId}
              className='musicInfo'
              onClick={() => {
                onClickInMusicList(trackId);
              }}
            >
              <ImageContainer src={artworkUrl100}></ImageContainer>
              <MusicTexts>
                <Text>
                  <Ellipsis>
                    <span>{trackName}</span>
                  </Ellipsis>
                </Text>
                <Text>
                  <Ellipsis>
                    <ArtistName>{artistName}</ArtistName>
                  </Ellipsis>
                </Text>
              </MusicTexts>
            </MusicCard>
          );
        })
      ) : (
        <div>결과없음</div>
      )}
      ;
    </MusicListContainer>
  );
}
export default memo(MusicList, (prev, next) => JSON.stringify(prev.keyword) === JSON.stringify(next.keyword));
