import styled from '@emotion/styled';
import Link from 'next/link';
import ListIcon from 'public/images/go-to-list-icon.svg';
import { useState } from 'react';

import Detail from '@/components/battle/Detail/Battle';
import { useGetBattle } from '@/components/battle/Detail/useGetBattle';
import { SelectedBattle } from '@/components/battle/types';
import VoteResult from '@/components/battle/voteResult';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';

function Short() {
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const [selectedBattle, setSelectedBattle] = useState<SelectedBattle>({
    battleId: 0,
    votedPostId: 0,
    clickSide: undefined,
  });

  const { data: musicData, refetch } = useGetBattle({ initBattleId: 0, selectedGenre });

  const onChangeSelectedBattleInfo = (battleId: number, votedPostId: number, clickSide: 'left' | 'right') => {
    setSelectedBattle({ battleId, votedPostId, clickSide });
  };

  const onClickGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingState(true);
    setSelectedGenre(e.target.value);
    setTimeout(() => {
      setIsLoadingState(false);
    }, 500);
  };

  const onClickSkip = () => {
    setIsLoadingState(true);
    refetch();
    setTimeout(() => {
      setIsLoadingState(false);
    }, 500);
  };

  return (
    <>
      <Header
        title='진행 중인 대결'
        actionButton={
          <Link href='/battle/list'>
            <ListIcon />
          </Link>
        }
      />
      <SelectContainer>
        <Genres onChange={onClickGenre} shouldNeedAll />
        <Detail
          musicData={musicData}
          isLoadingState={isLoadingState}
          onChangeSelectedBattleInfo={onChangeSelectedBattleInfo}
          refetch={refetch}
          onClickSkip={onClickSkip}
        />
      </SelectContainer>
      {selectedBattle.battleId && selectedBattle.votedPostId && (
        <VoteResult
          battleId={selectedBattle.battleId}
          votedPostId={selectedBattle.votedPostId}
          clickSide={selectedBattle.clickSide}
        />
      )}
      <BottomNav />
    </>
  );
}

export default Short;

const SelectContainer = styled.div`
  width: calc(100% - 4rem);
  height: calc(100vh - 22rem);
  padding: 0 2rem;
  min-height: 45rem;
  margin-bottom: 10rem;
`;
