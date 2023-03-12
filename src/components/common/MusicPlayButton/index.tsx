import styled from '@emotion/styled';
import PauseButton from 'public/images/pause-button.svg';
import PlayButton from 'public/images/play-button.svg';

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

    //console.log($opponentAudioElement, $selectedAudioElement);

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
