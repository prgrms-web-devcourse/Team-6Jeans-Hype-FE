import styled from '@emotion/styled';
import FireIcon from 'public/images/fire-icon.svg';

import { COLOR } from '@/constants/color';

import { Music } from '../types';
import BattleMusic from '.';

interface FinishedBattleMusicProps {
  music: Music;
  isMusicPlay?: boolean;
  updatePlayStatus?: () => void;
  opponentMusicUrl?: string;
  isWin: boolean;
  voteCount: number;
}

export default function FinishedBattleMusic({ isWin, voteCount, ...battleMusicProps }: FinishedBattleMusicProps) {
  return (
    <Container>
      <BattleMusic {...battleMusicProps} />
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
