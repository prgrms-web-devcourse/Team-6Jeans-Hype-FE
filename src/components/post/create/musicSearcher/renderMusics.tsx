import MusicListSkeleton from '@/components/common/skeleton/MusicList';
import { getMusicList } from '@/hooks/useQueryCreatePost';
import styled from '@emotion/styled';
import { MusicInfo, TrackInfo } from '../types';

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
  onClickInMusicList(track: TrackInfo): void;
  keyword: string;
}

function RenderMusics({ onClickInMusicList, keyword }: Props) {
  const { data: musicList, isLoading } = getMusicList(keyword);

  return isLoading ? (
    <>
      <MusicListSkeleton />
      <MusicListSkeleton />
      <MusicListSkeleton />
    </>
  ) : (
    musicList?.map((music: MusicInfo) => {
      const { key, title, subtitle, images } = music.track;
      console.log(musicList);
      return (
        <MusicCard key={key} className='musicInfo' onClick={() => onClickInMusicList(music.track)}>
          <img src={images.coverart} alt='img' width={80} />
          <MusicTexts>
            <Ellipsis>
              <span>{title}</span>
            </Ellipsis>
            <Ellipsis>
              <span>{subtitle}</span>
            </Ellipsis>
          </MusicTexts>
        </MusicCard>
      );
    })
  );
}
export default RenderMusics;
