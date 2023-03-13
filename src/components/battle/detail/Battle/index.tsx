import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Battles } from '@/components/battle/types';
import NoContent from '@/components/common/NoContent';
import BattleMusicSkeleton from '@/components/common/skeleton/BattleMusic';
import Toast from '@/components/common/Toast';
import { COLOR } from '@/constants/color';
import { useToast } from '@/hooks/useToast';

import { SelectedBattle } from '../../types';
import VoteResult from '../../voteResult';
import BattleMusic from '../BattleMusic';
import { BattleMusicWrapper, Container } from './style';

interface Props {
  battleId?: number | undefined;
  battle: Battles | undefined;
  isLoadingState?: boolean;
  refetch?: () => void;
  onClickSkip?: () => void;
  className?: string;
  useBattleMusicPlayFunctions: useBattleProps;
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
  const { showToast, handleToast } = useToast();

  const isSelected = typeof battle?.selectedPostId === 'number';

  const onChangeSelectedBattleInfo = (battleId: number, votedPostId: number, clickSide: 'left' | 'right') => {
    setSelectedBattle({ battleId, votedPostId, clickSide });
  };

  const selectBattleMusic = (clickSide: 'left' | 'right', musicId: number | undefined) => {
    if (isSelected) {
      handleToast();
      return;
    }

    if (battle && musicId) {
      onChangeSelectedBattleInfo(battle.battleId, musicId, clickSide);
    }

    if (!id) {
      setTimeout(() => {
        onChangeSelectedBattleInfo(0, 0, clickSide);
        useBattleMusicPlayFunctions.init();
      }, 1700);
      setTimeout(() => {
        refetch?.();
      }, 1800);
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
                isMusicPlay={useBattleMusicPlayFunctions.isLeftMusicPlay}
                updatePlayStatus={useBattleMusicPlayFunctions.clickLeftButton}
                music={battle.challenged.music}
                moving={isSelected ? undefined : 'left'}
                onClick={() => {
                  selectBattleMusic('left', battle.challenged.postId);
                }}
                opponentMusicUrl={battle?.challenging.music.musicUrl}
              />
              <BattleMusic
                isMusicPlay={useBattleMusicPlayFunctions.isRightMusicPlay}
                updatePlayStatus={useBattleMusicPlayFunctions.clickRightButton}
                music={battle.challenging.music}
                moving={isSelected ? undefined : 'right'}
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
      {showToast && <Toast message='이미 투표한 대결입니다.' bottom='10rem' />}
    </>
  );
}

export default Battle;

const NoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 1.5rem;
`;

const Skip = styled.div`
  position: absolute;
  left: 50%;
  bottom: -15%;
  transform: translateX(-50%);
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
