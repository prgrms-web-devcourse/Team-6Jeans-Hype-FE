import styled from '@emotion/styled';
import FireIcon from 'public/images/fire-icon.svg';

import { COLOR } from '@/constants/color';

import { Music } from '../types';
import { Card, Container as BattleMusicWrapper, Singer, StyledMusicPlayButton, Thumbnail, Title } from './style';

interface FinishedBattleMusicProps {
  music: Music;
  isMusicPlay?: boolean;
  updatePlayStatus?: () => void;
  opponentMusicUrl?: string;
  isWin: boolean;
  voteCount: number;
}

export default function FinishedBattleMusic({
  isWin,
  voteCount,
  music,
  opponentMusicUrl,
  isMusicPlay,
  updatePlayStatus,
}: FinishedBattleMusicProps) {
  return (
    <Container>
      <BattleMusicWrapper>
        <StyledCard isWin={isWin}>
          <Title className='title'>{music.title}</Title>
          <Singer className='singer'>{music.singer}</Singer>
        </StyledCard>
        <StyledThumbnail src={music.albumCoverUrl} isWin={isWin} />
        <StyledMusicPlayButton
          key={music.title}
          src={music.musicUrl}
          opponentMusicUrl={opponentMusicUrl}
          isMusicPlay={isMusicPlay}
          updatePlayStatus={updatePlayStatus}
        />
      </BattleMusicWrapper>
      <VoteResult>
        {isWin && <StyledFireIcon />}
        <VoteCount isWin={isWin}>{voteCount}</VoteCount>
      </VoteResult>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.7rem;
  width: 15.7rem;
  align-items: center;
`;

const VoteResult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

const StyledFireIcon = styled(FireIcon)`
  width: 2rem;
  height: 2.2rem;
  & > path {
    stroke: ${COLOR.blue};
  }
`;

const VoteCount = styled.div<{ isWin: boolean }>`
  font-weight: 600;
  font-size: 2.2rem;
  line-height: 3.3rem;
  color: ${({ isWin }) => (isWin ? COLOR.blue : COLOR.lightGray)};
  padding-bottom: 0.3rem;
`;

const StyledCard = styled(Card)<{ isWin: boolean }>`
  ${({ isWin }) =>
    isWin ? 'background: linear-gradient(98.38deg, #7d74dc -1.83%, #7697ec 86.44%)' : 'background-color:  #E8E8E8'};

  & > .singer,
  & > .title {
    color: ${({ isWin }) => (isWin ? COLOR.background : COLOR.lightGray)};
  }
`;

const StyledThumbnail = styled(Thumbnail)<{ isWin: boolean }>`
  ${({ isWin }) => (isWin ? '' : 'filter: grayscale();')};
`;
