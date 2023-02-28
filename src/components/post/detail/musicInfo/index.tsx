import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import { Music } from '../types';

function MusicInfo({ musicName, albumCoverUrl, singer }: Music) {
  console.log(albumCoverUrl);
  return (
    <MusicInfoContainer>
      <MusicItem>
        <MusicTitle>{musicName}</MusicTitle>
        <MusicSinger>{singer}</MusicSinger>
        <MusicThumbnail albumCoverUrl={albumCoverUrl} />
      </MusicItem>
    </MusicInfoContainer>
  );
}

export default MusicInfo;

interface StyleProps {
  albumCoverUrl: string;
}

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

const MusicThumbnail = styled.div`
  background-image: url(${({ albumCoverUrl }: StyleProps) => albumCoverUrl});
  background-position: center center;
  background-repeat: no-repeat;

  filter: drop-shadow(0 0 1.5rem rgba(158, 158, 158, 0.25));
  border-radius: 1rem;

  width: 20rem;
  height: 20rem;
  margin-bottom: 4rem;
`;
