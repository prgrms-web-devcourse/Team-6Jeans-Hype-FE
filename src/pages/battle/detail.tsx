import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ShuffleIcon from 'public/images/go-to-shuffle-icon.svg';

import Select from '@/components/battle/select';
import VoteResult from '@/components/battle/voteResult';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import useVoteResult from '@/components/battle/select/hooks/useVoteSelect';

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { musicData, isLoadingState, selectedBattle, position, onClickMusic, onClickSkip } = useVoteResult(
    id ? Number(id) : 1,
  );

  return id ? (
    <AuthRequiredPage>
      <Header
        title='진행 중인 대결'
        actionButton={
          <Link href='/post/battle/short'>
            <ShuffleIcon />
          </Link>
        }
      />
      <SelectContainer>
        <Empty /> {/* 원래 장르가 있던 영역인데 쇼츠페이지와 디자인 통일하기 위해 장르의 height 만큼 영역 줌 */}
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

const Empty = styled.div`
  height: 3rem;
`;
