import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ListIcon from 'public/images/go-to-list-icon.svg';

import FinishedBattle from '@/components/battle/detail/Battle/Finished';
import Battle from '@/components/battle/detail/Battle/index';
import { useGetBattle } from '@/components/battle/detail/useGetBattle';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: battle } = useGetBattle({ initBattleId: Number(id), selectedGenre: 'ALL' });

  const getHeaderTitle = () => {
    if (!battle) {
      return '';
    }
    return battle.isProgress ? '진행 중인 대결' : '종료된 대결';
  };

  return id ? (
    <AuthRequiredPage>
      <Header
        title={getHeaderTitle()}
        actionButton={
          <Link href='/battle/list'>
            <ListIcon />
          </Link>
        }
      />
      <Container>{battle && (battle.isProgress ? <Battle battle={battle} /> : <FinishedBattle />)}</Container>
      <BottomNav />
    </AuthRequiredPage>
  ) : (
    <div>id 없음</div>
  );
}

export default Detail;

const Container = styled.div`
  width: calc(100% - 4rem);
  height: calc(100vh - 16rem);
  min-height: 60rem;
  padding: 0 2rem;
  padding-top: 1.27rem;
`;
