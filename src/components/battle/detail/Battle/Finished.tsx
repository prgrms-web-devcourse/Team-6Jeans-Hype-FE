import styled from '@emotion/styled';

import { Battles } from '@/components/battle/types';
import { COLOR } from '@/constants/color';

import FinishedBattleMusic from '../BattleMusic/Finished';
import { BattleMusicWrapper, Container } from './style';

interface FinishedBattleProps {
  battle: Battles;
  useBattleMusicPlayFunctions: useBattleProps;
  className?: string;
}

interface useBattleProps {
  isLeftMusicPlay: boolean;
  isRightMusicPlay: boolean;
  clickLeftButton: () => void;
  clickRightButton: () => void;
  init: () => void;
}

export default function FinishedBattle({ battle, useBattleMusicPlayFunctions, className }: FinishedBattleProps) {
  const { challenged, challenging } = battle;

  return (
    <Container className={className}>
      <Title>What’s your Hype Music?</Title>
      <BattleMusicWrapper>
        <FinishedBattleMusic
          isMusicPlay={useBattleMusicPlayFunctions.isLeftMusicPlay}
          updatePlayStatus={useBattleMusicPlayFunctions.clickLeftButton}
          music={challenged.music}
          voteCount={challenged.voteCnt ?? 0}
          isWin={
            typeof challenged.voteCnt === 'number' && typeof challenging.voteCnt === 'number'
              ? challenged.voteCnt > challenging.voteCnt
              : false
          }
          opponentMusicUrl={challenging.music.musicUrl}
        />
        <FinishedBattleMusic
          isMusicPlay={useBattleMusicPlayFunctions.isRightMusicPlay}
          updatePlayStatus={useBattleMusicPlayFunctions.clickRightButton}
          music={challenging.music}
          voteCount={challenging.voteCnt ?? 0}
          isWin={
            typeof challenging.voteCnt === 'number' && typeof challenged.voteCnt === 'number'
              ? challenging.voteCnt > challenged.voteCnt
              : false
          }
          opponentMusicUrl={challenged.music.musicUrl}
        />
      </BattleMusicWrapper>
    </Container>
  );
}

const Title = styled.div`
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  color: ${COLOR.gray};
  text-align: center;
`;
