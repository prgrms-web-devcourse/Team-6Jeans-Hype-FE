import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

import NoContent from '@/components/common/NoContent';
import AlbumPoster from '@/components/common/skeleton/AlbumPosterSkeleton';
import { COLOR } from '@/constants/color';
import useBattleMusicPlay from '@/hooks/useBattleMusicPlay';

import { SelectedBattle } from '../../types';
import VoteResult from '../../voteResult';
import BattleMusic from '../BattleMusic';
import { Battles } from '../types';

interface Props {
  battleId?: number | undefined;
  musicData: Battles | undefined;
  isLoadingState?: boolean;
  refetch?: () => void;
  onClickSkip?: () => void;
  className?: string;
}

function Battle({ musicData, isLoadingState, refetch, onClickSkip, className }: Props) {
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

  const { isLeftMusicPlay, isRightMusicPlay, clickLeftButton, clickRightButton } = useBattleMusicPlay();

  const selectBattleMusic = (clickSide: 'left' | 'right', musicId: number | undefined) => {
    if (musicData && musicId) {
      onChangeSelectedBattleInfo(musicData.battleId, musicId, clickSide);
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

  if (musicData == null) {
    return (
      <Wrapper>
        <NoContent text='대결할 음악이 없습니다.' isImage width={8} />
      </Wrapper>
    );
  }

  return (
    <>
      <Section className={className}>
        <Text>What’s your Hype Music?</Text>
        <BattleContainer>
          {isLoadingState ? (
            <>
              <AlbumPoster />
              <AlbumPoster />
            </>
          ) : (
            <>
              <BattleMusic
                isMusicPlay={isLeftMusicPlay}
                updatePlaySatus={clickLeftButton}
                music={musicData.challenged.music}
                moving='left'
                onClick={() => {
                  selectBattleMusic('left', musicData.challenged.postId);
                }}
                opponentMusicUrl={musicData?.challenging.music.musicUrl}
              />
              <BattleMusic
                isMusicPlay={isRightMusicPlay}
                updatePlaySatus={clickRightButton}
                music={musicData.challenging.music}
                moving='right'
                onClick={() => {
                  selectBattleMusic('right', musicData.challenging.postId);
                }}
                opponentMusicUrl={musicData?.challenged.music.musicUrl}
              />
            </>
          )}
        </BattleContainer>
        {!id && <Skip onClick={onClickSkip}>건너뛰기</Skip>}
      </Section>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 0.5rem;
`;

const Section = styled.div`
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

const BattleContainer = styled.div`
  width: 100%;
  max-width: 37.5rem;
  height: 36.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
`;
