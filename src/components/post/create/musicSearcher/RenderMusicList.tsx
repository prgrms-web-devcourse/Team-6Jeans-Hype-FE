import MusicListSkeleton from '@/components/common/skeleton/MusicList';
import { getMusicData } from '@/utils/apis/music';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect } from 'react';
import { KeywordInfo, MusicInfo } from '../types';

const MusicCard = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px;
  height: 80px;
`;

const MusicTexts = styled.div`
  padding-left: 10px;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const Ellipsis = styled.div`
  width: 200px;
  height: 50%;

  display: flex;
  align-items: center;
  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

interface Props {
  onClickInMusicList(music: MusicInfo): void;
  onChangeMusicInfo(music: MusicInfo): void;
  keywords: KeywordInfo;
}

function RenderMusicList({ onClickInMusicList, onChangeMusicInfo, keywords }: Props) {
  const { data: musicList, isLoading } = useQuery(['musicList', keywords], () => getMusicData(keywords), {
    enabled: !!keywords,
  });

  const renderList = () => {
    return musicList.length ? (
      musicList?.map((music: MusicInfo) => {
        const { trackId, trackName, artistName, artworkUrl100, previewUrl } = music;
        const newMusicInfo = {
          trackId,
          trackName,
          artistName,
          artworkUrl100,
          previewUrl,
        };

        return (
          <MusicCard
            key={trackId}
            className='musicInfo'
            onClick={() => {
              onClickInMusicList(newMusicInfo);
              onChangeMusicInfo(newMusicInfo);
            }}
          >
            <img src={artworkUrl100} alt='img' width={80} height={80} />
            <MusicTexts>
              <Ellipsis>
                <span>{trackName}</span>
              </Ellipsis>
              <Ellipsis>
                <span>{artistName}</span>
              </Ellipsis>
            </MusicTexts>
          </MusicCard>
        );
      })
    ) : (
      <div>결과없음</div>
    );
  };

  return isLoading ? (
    <>
      <MusicListSkeleton />
      <MusicListSkeleton />
      <MusicListSkeleton />
    </>
  ) : (
    renderList()
  );
}
export default memo(RenderMusicList, (prev, next) => JSON.stringify(prev.keywords) === JSON.stringify(next.keywords));
