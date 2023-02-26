import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import { Music } from '../types';

function MusicInfo({ musicName, thumbnailUrl, singer }: Music) {
  return (
    <MusicInfoContainer>
      <MusicItem>
        <MusicTitle>노래 제목 : {musicName}</MusicTitle>
        <MusicSinger>가수 : {singer}</MusicSinger>
        <MusicThumbnail src={thumbnailUrl} />
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

const MusicThumbnail = styled.div<{ src: string }>`
  background-image: url('http://www.akbobada.com/home/akbobada/archive/akbo/img/20150115102222.jpg');
  background-position: center center;

  filter: drop-shadow(0 0 1.5rem rgba(158, 158, 158, 0.25));
  border-radius: 1rem;

  width: 20rem;
  height: 20rem;
  margin-bottom: 4rem;
`;
