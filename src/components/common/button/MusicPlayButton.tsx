import styled from '@emotion/styled';
import PauseIcon from 'public/images/pause-button.svg';
import PlayIcon from 'public/images/play-button.svg';

interface Props {
  src?: string;
  isMusicPlay?: boolean;
  updatePlayStatus?: () => void;
  opponentMusicUrl?: string;
  onChangeCurrentTime?: (time: number, isPlay: boolean) => void;
  className?: string;
}

function MusicPlayButton({
  src,
  opponentMusicUrl,
  isMusicPlay,
  updatePlayStatus,
  onChangeCurrentTime,
  className,
}: Props) {
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
    <Container className={className}>
      <Audio src={src} id={`audio${src}`} controls loop />
      <Button onClick={(e) => onClickPlayButton(e)}>{isMusicPlay ? <PlayIcon /> : <PauseIcon />}</Button>
    </Container>
  );
}

export default MusicPlayButton;

const Container = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
`;

const Audio = styled.audio`
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  & > svg {
    width: 100%;
    height: 100%;
  }
  cursor: pointer;
`;
