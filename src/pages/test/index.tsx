import styled from '@emotion/styled';
import Link from 'next/link';
import ListIcon from 'public/images/go-to-list-icon.svg';

import TestCompo from '@/components/battle/detail';
import useVoteSelect from '@/components/battle/select/hooks/useVoteSelect';
import VoteResult from '@/components/battle/voteResult';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';

function Test() {
  const { musicData, isLoadingState, selectedBattle, position, onClickGenre, onClickMusic, onClickSkip } =
    useVoteSelect();
  const { battleId, votedPostId } = selectedBattle;
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
        <TestCompo
          musicData={musicData}
          isLoadingState={isLoadingState}
          onClickMusic={onClickMusic}
          onClickSkip={onClickSkip}
        />
      </SelectContainer>
      {battleId && votedPostId && <VoteResult battleId={battleId} votedPostId={votedPostId} clickSide={position} />}
      <BottomNav />
    </>
  );
}

export default Test;

const SelectContainer = styled.div`
  width: calc(100% - 4rem);
  height: calc(100vh - 16rem);
  padding: 0 2rem;
`;
