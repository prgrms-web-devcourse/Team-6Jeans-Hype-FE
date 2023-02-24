import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import MusicListSkeleton from '@/components/common/skeleton/MusicList';
import { COLOR } from '@/constants/color';
import { getMusicData } from '@/utils/apis/music';

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
                <ImageContainer>
                  <img src={artworkUrl100} />
                </ImageContainer>
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
  height: calc(100vh - 15rem);
  overflow-y: scroll;
`;
const MusicCard = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 0.3rem;
  height: 7rem;
  box-shadow: 0 0 1rem rgba(226, 226, 226, 0.25);
  background-color: ${COLOR.white};
  border-radius: 1rem;
`;

const ImageContainer = styled.div`
  border-radius: 10px;
  width: 6.4rem;
  height: 6.4rem;
  border: 0.1rem solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 5.5rem;
    height: 5rem;
  }
`;

const MusicTexts = styled.div`
  width: calc(100% - 2rem - 7rem);
  height: 60%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const Text = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  line-height: 1.7rem;
`;

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  & > span {
    font-size: 1.2rem;
  }
`;

const ArtistName = styled.div`
  color: ${COLOR.gray};
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
