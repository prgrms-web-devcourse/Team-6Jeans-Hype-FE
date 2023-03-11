import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { MouseEvent, useRef } from 'react';

import MusicPlayButton from '@/components/common/MusicPlayButton';
import { COLOR } from '@/constants/color';

import { Music } from '../types';

interface Prop {
  music: Music;
  moving?: 'left' | 'right';
  onClick?: () => void;
  isMusicPlay: boolean;
  updatePlaySatus: () => void;
  opponentMusicUrl?: string;
}

function BattleMusic({ music, moving, onClick, opponentMusicUrl, isMusicPlay, updatePlaySatus }: Prop) {
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const { albumCoverUrl, musicUrl, title, singer } = music;

  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (e.defaultPrevented) return;
    onClick?.();
    moving && move();
  };

  const move = () => {
    const thumbnailElement = thumbnailRef.current;
    if (thumbnailElement) {
      const savedClassName = thumbnailElement.className;
      thumbnailElement.className = `${savedClassName} active`;

      // if (!id) {
      setTimeout(() => {
        thumbnailElement.className = savedClassName;
      }, 1700);
      // }
    }
  };

  return (
    <Container>
      <Wrapper onClick={(e) => handleClick(e)} className='container'>
        <Thumbnail src={albumCoverUrl} clickSide={moving} ref={thumbnailRef}>
          <PlayIcon value={musicUrl}>
            <MusicPlayButton
              key={title}
              src={musicUrl}
              opponentMusicUrl={opponentMusicUrl}
              isMusicPlay={isMusicPlay}
              updatePlaySatus={updatePlaySatus}
            />
          </PlayIcon>
        </Thumbnail>
        <Title>{title}</Title>
        <Singer>{singer}</Singer>
      </Wrapper>
    </Container>
  );
}

export default BattleMusic;
const moveLeft = keyframes`
  0% {
    right:0%;
  }
  15% {
    right:55%;
  }
  100% {
    right:55%;
  }
`;

const moveRight = keyframes`
  0% {
    z-index: 99;
    left:0%;
  }
  15% {
    left:56%;
  }
  100% {
    z-index: 99;
    left:56%;
  }
`;

const changeOpacity = keyframes`
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const Container = styled.div`
  max-width: 20rem;
  width: 45%;
  height: 18rem;
  background: ${COLOR.white};
  box-shadow: 0px 0px 1.5rem rgba(158, 158, 158, 0.25);
  border-radius: 1rem;
  position: relative;

  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  top: -3rem;
`;

const Thumbnail = styled.div<{ src: string; clickSide: 'left' | 'right' | undefined }>`
  background-image: url(${(props) => props.src});
  background-color: ${COLOR.white};
  background-repeat: no-repeat;
  background-position: center center;
  filter: drop-shadow(0 0 1.5rem rgba(158, 158, 158, 0.25));
  border-radius: 1rem;
  width: 10rem;
  height: 10rem;
  position: relative;
  margin-bottom: 2rem;

  &.active {
    animation: ${(props) => (props.clickSide === 'right' ? moveLeft : moveRight)} 2s ease-in;
    & > div {
      animation: ${changeOpacity} 2s ease-in;
    }
  }
`;

const PlayIcon = styled.div<{ value: string | undefined }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(prop) => (prop.value === '' ? 'none' : 'block')};
`;

const Title = styled.div`
  width: calc(100% - 1.6rem);
  padding: 0 0.8rem;
  font-style: normal;
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.9rem;
  text-align: center;
  color: ${COLOR.deepBlue};
  margin-bottom: 1rem;
`;

const Singer = styled.div`
  width: calc(100% - 1.6rem);
  padding: 0 0.8rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.6rem;
  text-align: center;
  color: ${COLOR.gray};
`;
