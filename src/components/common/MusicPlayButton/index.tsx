import styled from '@emotion/styled';
import PauseButton from 'public/images/pause-button.svg';
import PlayButton from 'public/images/play-button.svg';

interface Props {
  src?: string;
  opponentMusicUrl?: string;
  isMusicPlay?: boolean;
  updatePlaySatus?: () => void;
}

function MusicPlayButton({ src, opponentMusicUrl, isMusicPlay, updatePlaySatus }: Props) {
  const onClickPlayButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const $opponentAudioElement = document.getElementById(`audio${opponentMusicUrl}`) as HTMLAudioElement;
    $opponentAudioElement?.pause();

    const $selectedAudioElement = document.getElementById(`audio${src}`) as HTMLAudioElement;

    if (!isMusicPlay) $selectedAudioElement?.play();
    else $selectedAudioElement?.pause();

    updatePlaySatus?.();
  };

  return (
    <PlayIcon>
      <Audio src={src} id={`audio${src}`} controls loop />
      <Button onClick={(e) => onClickPlayButton(e)}>{isMusicPlay ? <PauseButton /> : <PlayButton />}</Button>
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
