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
      <button onClick={(e) => onClickPlayButton(e)}>{isMusicPlay ? <PlayIcon /> : <PauseIcon />}</button>
    </Container>
  );
}

export default MusicPlayButton;

const Container = styled.div`
  position: relative;
`;

const Audio = styled.audio`
  visibility: hidden;
  position: absolute;
`;
