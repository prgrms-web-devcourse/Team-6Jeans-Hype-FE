import styled from '@emotion/styled';
import { useState } from 'react';
import PlayButton from 'public/images/play-button.svg';
import PauseButton from 'public/images/pause-button.svg';

interface Props {
  src?: string;
}

function MusicPlayButton({ src }: Props) {
  const [isMusicPlay, setIsMusicPlay] = useState(true);

  const onClickPlayButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const $audioElement = document.getElementById(`audio${src}`) as HTMLAudioElement;

    if (isMusicPlay) $audioElement?.play();
    else $audioElement?.pause();

    setIsMusicPlay((prev) => !prev);
  };

  return (
    <PlayIcon>
      <Audio src={src} id={`audio${src}`} controls loop />
      <Button onClick={(e) => onClickPlayButton(e)}>{isMusicPlay ? <PlayButton /> : <PauseButton />}</Button>
    </PlayIcon>
  );
}

export default MusicPlayButton;

const PlayIcon = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const Audio = styled.audio`
  opacity: 0;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;
