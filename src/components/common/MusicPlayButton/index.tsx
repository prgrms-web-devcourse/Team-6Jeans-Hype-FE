import styled from '@emotion/styled';
import { useState } from 'react';

interface Props {
  src?: string;
}

function MusicPlayButton({ src }: Props) {
  const [musicPlayStatus, setMusicPlayStatus] = useState(true);

  const onClickPlayButton = () => {
    const $audioElement = document.getElementById('audio');

    if (musicPlayStatus) $audioElement?.play();
    else $audioElement?.pause();

    setMusicPlayStatus((prev) => !prev);
  };

  return (
    <PostPlayIcon>
      <audio src={src} id='audio' controls loop></audio>
      <img
        src={`/images/${musicPlayStatus ? 'play-button' : 'google-logo'}.svg`}
        alt='play button'
        onClick={onClickPlayButton}
      />
      ;
    </PostPlayIcon>
  );
}

export default MusicPlayButton;

const PostPlayIcon = styled.div`
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
