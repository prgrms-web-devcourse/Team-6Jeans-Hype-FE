import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { MouseEvent, useRef } from 'react';

import MusicPlayButton from '@/components/common/MusicPlayButton';

import { Music } from '../types';
import { Container, PlayIcon, Singer, Thumbnail, Title, Wrapper } from './style';

interface Prop {
  music: Music;
  moving?: 'left' | 'right';
  onClick?: () => void;
  isMusicPlay: boolean;
  updatePlayStatus: () => void;
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
        <StyledThumbnail src={albumCoverUrl} clickSide={moving} ref={thumbnailRef}>
          <PlayIcon value={musicUrl}>
            <MusicPlayButton
              key={title}
              src={musicUrl}
              opponentMusicUrl={opponentMusicUrl}
              isMusicPlay={isMusicPlay}
              updatePlayStatus={updatePlayStatus}
            />
          </PlayIcon>
        </StyledThumbnail>
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

const StyledThumbnail = styled(Thumbnail)`
  &.active {
    animation: ${(props) => (props.clickSide === 'right' ? moveLeft : moveRight)} 2s ease-in;
    & > div {
      animation: ${changeOpacity} 2s ease-in;
    }
  }
`;
