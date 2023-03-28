import styled from '@emotion/styled';
import MusicPlusButton from 'public/images/plus-music.svg';

import { StyledMusicPlayButton } from '@/components/battle/detail/BattleMusic/style';
import { COLOR } from '@/constants/color';

import { Music } from '../Detail/types';

interface Prop {
  music: Music;
  onClick?: () => void;
  isMusicPlay: boolean;
  updatePlayStatus: () => void;
  opponentMusicUrl?: string;
}

function SelectMusic({ music, onClick, isMusicPlay, updatePlayStatus, opponentMusicUrl }: Prop) {
  const { albumCoverUrl, musicUrl, title, singer } = music;

  return (
    <Container onClick={onClick}>
      <Card>
        <Title>{title}</Title>
        <Singer>{singer}</Singer>
      </Card>
      <Thumbnail src={albumCoverUrl} />
      {musicUrl ? (
        <StyledMusicPlayButton
          key={title}
          src={musicUrl}
          opponentMusicUrl={opponentMusicUrl}
          isMusicPlay={isMusicPlay}
          updatePlayStatus={updatePlayStatus}
        />
      ) : (
        <StyledMusicPlusButton />
      )}
    </Container>
  );
}

export default SelectMusic;

const Container = styled.div`
  position: relative;
  width: 15.7rem;
  min-height: 22.4rem;
`;

const Card = styled.div`
  position: absolute;
  top: 4.1rem;
  left: 0;
  background: ${COLOR.white};
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  border-radius: 10px;
  width: 100%;
  min-height: calc(100% - 4.1rem);
  padding: 1.5rem;
  box-sizing: border-box;
  height: fit-content;
`;

const Thumbnail = styled.div<{ src: string; clickSide?: 'left' | 'right' }>`
  background-image: url(${(props) => props.src});
  background-color: ${(props) => (props.src ? COLOR.deepBlue : COLOR.gray)};
  background-repeat: no-repeat;
  background-position: center center;
  filter: drop-shadow(0 0 1.5rem rgba(158, 158, 158, 0.25));
  border-radius: 1rem;
  width: 10rem;
  height: 10rem;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.7rem;
  text-align: center;
  color: ${COLOR.deepBlue};
  margin-top: 7.5rem;
  height: 3.4rem;
  word-break: break-all;
  overflow-y: auto;
`;

const Singer = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.6rem;
  text-align: center;
  color: ${COLOR.gray};
  margin-top: 0.7rem;
  height: 3.2rem;
  word-break: break-all;
  overflow-y: auto;
`;

const StyledMusicPlusButton = styled(MusicPlusButton)`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
`;
