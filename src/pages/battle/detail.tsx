import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ShuffleIcon from 'public/images/go-to-shuffle-icon.svg';

import Select from '@/components/battle/select';
import VoteResult from '@/components/battle/voteResult';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import useVoteResult from '@/hooks/useVoteResult';

function Detail() {
  const router = useRouter();

  const { musicData, isLoadingState, selectedBattle, position, onClickGenre, onClickMusic, onClickSkip } =
    useVoteResult(router.query.id ? Number(router.query.id) : 1);

  return router.query.id ? (
    <AuthRequiredPage>
      <Header
        title='진행중인 대결'
        actionButton={
          <Link href='/post/battle/short'>
            <ShuffleIcon />
          </Link>
        }
      />
      <SelectContainer>
        <Genres onChange={onClickGenre} shouldNeedAll />
        <Select
          battleId={Number(router.query.id)}
          musicData={musicData}
          isLoadingState={isLoadingState}
          onClickMusic={onClickMusic}
          onClickSkip={onClickSkip}
        />
      </SelectContainer>
      {selectedBattle.battleId !== -1 && selectedBattle.votedPostId !== -1 && (
        <VoteResult battleId={selectedBattle.battleId} votedPostId={selectedBattle.votedPostId} clickSide={position} />
      )}
      <BottomNav />
    </AuthRequiredPage>
  ) : (
    <div>id 없음</div>
  );
}

export default Detail;

const SelectContainer = styled.div`
  width: calc(100% - 4rem);
  height: calc(100vh - 16rem);
  min-height: 60rem;
  padding: 0 2rem;
`;
