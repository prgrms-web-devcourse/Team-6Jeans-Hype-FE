import styled from '@emotion/styled';
import Link from 'next/link';
import ShortsIcon from 'public/images/shuffle.svg';

import BattleList from '@/components/battle/list';
import { useGetBattleList } from '@/components/battle/list/hooks/useGetBattles';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';

export default function BattleListPage() {
  const { data: battleList } = useGetBattleList();

  return (
    <>
      <Header
        title='진행 중인 대결'
        actionButton={
          <Link href='/battle/short'>
            <ShortsIcon />
          </Link>
        }
      />
      <Container>
        <Genres shouldNeedAll />
        {battleList && <BattleList battleList={battleList} />}
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
`;
