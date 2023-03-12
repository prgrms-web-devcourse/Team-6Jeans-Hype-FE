import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { MouseEvent, useRef } from 'react';

import { Music } from '../types';
import { Card, Container, Singer, StyledMusicPlayButton, Thumbnail, Title } from './style';

interface Prop {
  music: Music;
  moving?: 'left' | 'right';
  onClick?: () => void;
  isMusicPlay?: boolean;
  updatePlayStatus?: () => void;
  opponentMusicUrl?: string;
}

function BattleMusic({ music, moving, onClick, opponentMusicUrl, isMusicPlay, updatePlayStatus }: Prop) {
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const { albumCoverUrl, musicUrl, title, singer } = music;

  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (e.defaultPrevented) return;
    onClick?.();
    moving && move();
  };

  const move = () => {
    const thumbnailElement = thumbnailRef.current;
    const playButtonElement = document.querySelector(`.play${moving}`);

    if (thumbnailElement && playButtonElement) {
      const savedClassName = [thumbnailElement.className, playButtonElement.className];

      thumbnailElement.className = `${savedClassName[0]} active`;
      playButtonElement.className = `${savedClassName[1]} active`;

      // if (!id) {
      setTimeout(() => {
        thumbnailElement.className = savedClassName[0];
        playButtonElement.className = savedClassName[1];
      }, 1700);
      // }
    }
  };

  return (
    <Container>
      <Card onClick={(e) => handleClick(e)}>
        <Title>{title}</Title>
        <Singer>{singer}</Singer>
      </Card>
      <StyledThumbnail onClick={(e) => handleClick(e)} src={albumCoverUrl} clickSide={moving} ref={thumbnailRef} />
      <StyledMusicPlayButton
        key={title}
        src={musicUrl}
        opponentMusicUrl={opponentMusicUrl}
        isMusicPlay={isMusicPlay}
        updatePlayStatus={updatePlayStatus}
        className={`play${moving}`}
      />
    </Container>
  );
}

export default BattleMusic;
const moveLeft = keyframes`
  0% {
    left:50%;
  }
  15% {
    left:-7%;
  }
  100% {
    left:-7%;
  }
`;

const moveRight = keyframes`
  0% {
    z-index: 99;
    left:50%;
  }
  15% {
    left:107.6%;
  }
  100% {
    z-index: 99;
    left:107.6%;
  }
`;

const StyledThumbnail = styled(Thumbnail)`
  &.active {
    animation: ${({ clickSide }) => (clickSide === 'right' ? moveLeft : moveRight)} 2s ease-in;
  }
`;
