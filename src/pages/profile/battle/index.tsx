import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import BattleList from '@/components/battle/list';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import { useGetMyBattleList } from '@/components/profile/battle/useGetMyBattleList';

export default function MyBattleListPage() {
  const router = useRouter();
  const { memberId } = router.query;

  const { data: myBattleList } = useGetMyBattleList({ memberId: Number(memberId) });

  return (
    <AuthRequiredPage>
      <Header title='참여한 대결' />
      <Container>
        <Genres shouldNeedAll />
        {myBattleList && <BattleList battleList={myBattleList} />}
      </Container>
      <BottomNav />
    </AuthRequiredPage>
  );
}

const Container = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 9.5rem;
`;
