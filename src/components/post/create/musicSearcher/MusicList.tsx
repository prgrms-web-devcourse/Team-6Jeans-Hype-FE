import MusicListSkeleton from '@/components/common/skeleton/MusicList';
import { getMusicData } from '@/utils/apis/music';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { Music } from '../types';

const MusicCard = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px;
  height: 80px;
`;

const MusicTexts = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
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
  font-size: 1.2rem;
`;
const TitleText = styled.span`
  border: 1px solid #7893ea;
  border-radius: 10px;
  padding: 3px 5px;
  margin-right: 5px;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.05rem;
  color: #7893ea;
`;

interface Props {
  onClickInMusicList(music: Music): void;
  onChangeMusicInfo(music: Music): void;
  keyword: string;
}

function RenderMusicList({ onClickInMusicList, onChangeMusicInfo, keyword }: Props) {
  const { data: musicList, isLoading } = useQuery(['musicList', keyword], () => getMusicData(keyword), {
    enabled: !!keyword,
  });

  const renderList = () => {
    return musicList.length ? (
      musicList?.map((music: Music) => {
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
            <MusicTexts>
              <Text>
                <TitleText>TITLE</TitleText>
                <Ellipsis>{trackName}</Ellipsis>
              </Text>
              <Text>
                <Ellipsis>{artistName}</Ellipsis>
              </Text>
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
export default memo(RenderMusicList, (prev, next) => JSON.stringify(prev.keyword) === JSON.stringify(next.keyword));
