import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ListIcon from 'public/images/go-to-list-icon.svg';
import { useState } from 'react';

import DetailComponent from '@/components/battle/Detail/Battle';
import { useGetBattle } from '@/components/battle/select/hooks/useGetBattle';
import { SelectedBattle } from '@/components/battle/types';
import VoteResult from '@/components/battle/voteResult';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';

function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const [selectedBattle, setSelectedBattle] = useState<SelectedBattle>({
    battleId: 0,
    votedPostId: 0,
    clickSide: undefined,
  });

  const { data: musicData } = useGetBattle({ initBattleId: Number(id), selectedGenre: 'ALL' });

  const onChangeSelectedBattleInfo = (battleId: number, votedPostId: number, clickSide: 'left' | 'right') => {
    setSelectedBattle({ battleId, votedPostId, clickSide });
  };

  return id ? (
    <AuthRequiredPage>
      <Header
        title='진행 중인 대결'
        actionButton={
          <Link href='/battle/list'>
            <ListIcon />
          </Link>
        }
      />
      <SelectContainer>
        <Empty />
        <DetailComponent musicData={musicData} onChangeSelectedBattleInfo={onChangeSelectedBattleInfo} />
      </SelectContainer>
      {selectedBattle.battleId && selectedBattle.votedPostId && (
        <VoteResult
          battleId={selectedBattle.battleId}
          votedPostId={selectedBattle.votedPostId}
          clickSide={selectedBattle.clickSide}
        />
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
  height: 0.6rem;
`;
