import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Battles } from '@/components/battle/types';
import NoContent from '@/components/common/NoContent';
import BattleMusicSkeleton from '@/components/common/skeleton/BattleMusic';
import { COLOR } from '@/constants/color';

import { SelectedBattle } from '../../types';
import VoteResult from '../../voteResult';
import BattleMusic from '../BattleMusic';

interface Props {
  battleId?: number | undefined;
  battle: Battles | undefined;
  isLoadingState?: boolean;
  refetch?: () => void;
  onClickSkip?: () => void;
  className?: string;
  useBattleMusicPlayFunctions?: useBattleProps;
}

interface useBattleProps {
  isLeftMusicPlay: boolean;
  isRightMusicPlay: boolean;
  clickLeftButton: () => void;
  clickRightButton: () => void;
  init: () => void;
}

function Battle({ battle, isLoadingState, refetch, onClickSkip, className, useBattleMusicPlayFunctions }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [selectedBattle, setSelectedBattle] = useState<SelectedBattle>({
    battleId: 0,
    votedPostId: 0,
    clickSide: undefined,
  });

  const onChangeSelectedBattleInfo = (battleId: number, votedPostId: number, clickSide: 'left' | 'right') => {
    setSelectedBattle({ battleId, votedPostId, clickSide });
  };

  const selectBattleMusic = (clickSide: 'left' | 'right', musicId: number | undefined) => {
    if (battle && musicId) {
      onChangeSelectedBattleInfo(battle.battleId, musicId, clickSide);
    }

    if (!id) {
      setTimeout(() => {
        onChangeSelectedBattleInfo(0, 0, clickSide);
      }, 1700);
      setTimeout(() => {
        refetch?.();
      }, 1750);
    }
  };

  if (battle == null) {
    return (
      <NoContentWrapper>
        <NoContent text='대결할 음악이 없습니다.' isImage width={8} />
      </NoContentWrapper>
    );
  }

  return (
    <>
      <Container className={className}>
        <Text>What’s your Hype Music?</Text>
        <BattleMusicWrapper>
          {isLoadingState ? (
            <BattleMusicSkeleton />
          ) : (
            <>
              <BattleMusic
                isMusicPlay={useBattleMusicPlayFunctions?.isLeftMusicPlay}
                updatePlayStatus={useBattleMusicPlayFunctions?.clickLeftButton}
                music={battle.challenged.music}
                moving='left'
                onClick={() => {
                  selectBattleMusic('left', battle.challenged.postId);
                }}
                opponentMusicUrl={battle?.challenging.music.musicUrl}
              />
              <BattleMusic
                isMusicPlay={useBattleMusicPlayFunctions?.isRightMusicPlay}
                updatePlayStatus={useBattleMusicPlayFunctions?.clickRightButton}
                music={battle.challenging.music}
                moving='right'
                onClick={() => {
                  selectBattleMusic('right', battle.challenging.postId);
                }}
                opponentMusicUrl={battle?.challenged.music.musicUrl}
              />
            </>
          )}
        </BattleMusicWrapper>
        {!id && <Skip onClick={onClickSkip}>건너뛰기</Skip>}
      </Container>
      {selectedBattle.battleId && selectedBattle.votedPostId ? (
        <VoteResult
          battleId={selectedBattle.battleId}
          votedPostId={selectedBattle.votedPostId}
          clickSide={selectedBattle.clickSide}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Battle;

const NoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 0.5rem;
`;

const Container = styled.div`
  position: relative;
  width: 33.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Skip = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 1.3rem;
  color: ${COLOR.blue};
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 1.7rem;
  background: linear-gradient(98.38deg, #7d74dc -1.83%, #7697ec 86.44%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  font-weight: 600;
  text-align: center;
`;

const BattleMusicWrapper = styled.div`
  width: 100%;
  max-width: 37.5rem;
  height: 36.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
`;
