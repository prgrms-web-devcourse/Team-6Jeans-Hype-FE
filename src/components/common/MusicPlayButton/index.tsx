import styled from '@emotion/styled';
import { useState } from 'react';

interface Props {
  src?: string;
}

function MusicPlayButton({ src }: Props) {
  const [isMusicPlay, setIsMusicPlay] = useState(true);

  const onClickPlayButton = () => {
    const $audioElement = document.getElementById(`audio${src}`) as HTMLAudioElement;

    if (isMusicPlay) $audioElement?.play();
    else $audioElement?.pause();

    setIsMusicPlay((prev) => !prev);
  };

  return (
    <PlayIcon>
      <audio src={src} id={`audio${src}`} controls loop></audio>
      <img
        src={`/images/${isMusicPlay ? 'play-button' : 'google-logo'}.svg`}
        alt='play button'
        onClick={onClickPlayButton}
      />
      ;
    </PlayIcon>
  );
}

export default MusicPlayButton;

const PlayIcon = styled.div`
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  position: relative;

  & audio {
    opacity: 0;
  }

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 7rem;
    height: 7rem;
  }
`;
