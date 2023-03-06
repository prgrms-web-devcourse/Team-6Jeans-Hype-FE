import styled from '@emotion/styled';

import BattleList from '@/components/battle/list';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import { useGetMyBattleList } from '@/components/mypage/battle/useGetMyBattleList';

export default function MyBattleListPage() {
  const { data: myBattleList } = useGetMyBattleList();
  return (
    <>
      <Header title='참여한 대결' />
      <Container>
        <Genres shouldNeedAll />
        {myBattleList && <BattleList battleList={myBattleList} />}
      </Container>
      <BottomNav />
    </>
  );
}

const Container = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 3.7rem;
  padding-bottom: 8rem;
`;
