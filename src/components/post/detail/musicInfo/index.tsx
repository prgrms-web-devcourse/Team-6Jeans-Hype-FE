import AlbumPoster from '@/components/common/AlbumPoster';
import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import { Music } from '../types';

function MusicInfo({ musicName, thumbnailUrl, singer }: Music) {
  return (
    <MusicInfoContainer>
      <MusicItem>
        <MusicTitle>노래 제목 : {musicName}</MusicTitle>
        <MusicSinger>가수 : {singer}</MusicSinger>
        <AlbumPoster lazy={true} size={20} src={thumbnailUrl} />
      </MusicItem>
    </MusicInfoContainer>
  );
}

export default MusicInfo;

const MusicInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 8rem auto 0 auto;
`;

const MusicItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
`;

const MusicTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.2rem;
  margin-bottom: 0.5rem;

  color: ${COLOR.white};
`;

const MusicSinger = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.8rem;
  margin-bottom: 2.5rem;

  text-align: center;

  color: ${COLOR.white};
`;
