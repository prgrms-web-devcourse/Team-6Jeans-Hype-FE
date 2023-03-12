import styled from '@emotion/styled';

import { Battles } from '@/components/battle/types';
import { COLOR } from '@/constants/color';

import FinishedBattleMusic from '../BattleMusic/Finished';

interface FinishedBattleProps {
  battle: Battles;
  useBattleMusicPlayFunctions: useBattleProps;
}

interface useBattleProps {
  isLeftMusicPlay: boolean;
  isRightMusicPlay: boolean;
  clickLeftButton: () => void;
  clickRightButton: () => void;
  init: () => void;
}

export default function FinishedBattle({ battle, useBattleMusicPlayFunctions }: FinishedBattleProps) {
  const { challenged, challenging } = battle;

  return (
    <Container>
      <Title>What’s your Hype Music?</Title>
      <MusicContainer>
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
          opponentMusicUrl={challenging.music.musicUrl}
        />
      </MusicContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8.4rem;
  padding-bottom: 10rem;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;
  color: ${COLOR.gray};
  text-align: center;
`;

const MusicContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.3rem;
`;
