import MusicPlayButton from '@/components/common/MusicPlayButton';

import { Card, Container, PlayIcon, Singer, Thumbnail, Title } from './style';

interface FinishedBattleMusicProps {
  albumCoverImage: string;
  title: string;
  singer: string;
  musicUrl?: string;
  isWin: boolean;
  votedCount: number;
  opponentMusicUrl?: string;
  isMusicPlay?: boolean;
  updatePlayStatus?: () => void;
}

export default function FinishedBattleMusic({
  albumCoverImage,
  title,
  singer,
  musicUrl,
  // TODO 스타일링 리팩토링 하고나서, 아래 안 쓰여진 prop들 이용해서 투표 상태 UI 추가해야 함
  isWin,
  votedCount,
  opponentMusicUrl,
  isMusicPlay,
  updatePlayStatus,
}: FinishedBattleMusicProps) {
  return (
    <Container>
      <Card>
        <Thumbnail src={albumCoverImage}>
          <PlayIcon value={musicUrl}>
            <MusicPlayButton
              key={title}
              src={musicUrl}
              opponentMusicUrl={opponentMusicUrl}
              isMusicPlay={isMusicPlay}
              updatePlayStatus={updatePlayStatus}
            />
          </PlayIcon>
        </Thumbnail>
        <Title>{title}</Title>
        <Singer>{singer}</Singer>
      </Card>
    </Container>
  );
}
