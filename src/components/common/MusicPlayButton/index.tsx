import styled from '@emotion/styled';
import PauseIcon from 'public/images/pause-button.svg';
import PlayIcon from 'public/images/play-button.svg';

interface Props {
  src?: string;
  isMusicPlay?: boolean;
  updatePlayStatus?: () => void;
  opponentMusicUrl?: string;
  onChangeCurrentTime?: (time: number, isPlay: boolean) => void;
}

function MusicPlayButton({ src, opponentMusicUrl, isMusicPlay, updatePlayStatus, onChangeCurrentTime }: Props) {
  const onClickPlayButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const $opponentAudioElement = document.getElementById(`audio${opponentMusicUrl}`) as HTMLAudioElement;
    $opponentAudioElement?.pause();

    const $selectedAudioElement = document.getElementById(`audio${src}`) as HTMLAudioElement;

    if (isMusicPlay) {
      $selectedAudioElement?.play();
      if (onChangeCurrentTime) {
        onChangeCurrentTime($selectedAudioElement.currentTime, true);
      }
    } else {
      $selectedAudioElement?.pause();
      if (onChangeCurrentTime) {
        onChangeCurrentTime($selectedAudioElement.currentTime, false);
      }
    }

    updatePlayStatus?.();
  };

  return (
    <Container>
      <Audio src={src} id={`audio${src}`} controls loop />
      <PlayButton onClick={(e) => onClickPlayButton(e)}>{isMusicPlay ? <PlayIcon /> : <PauseIcon />}</PlayButton>
    </Container>
  );
}

export default MusicPlayButton;

const Container = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const Audio = styled.audio`
  opacity: 0;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;
