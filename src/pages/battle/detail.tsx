import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ListIcon from 'public/images/go-to-list-icon.svg';

import Battle from '@/components/battle/detail/Battle/index';
import { useGetBattle } from '@/components/battle/detail/useGetBattle';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: musicData } = useGetBattle({ initBattleId: Number(id), selectedGenre: 'ALL' });

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
      <Container>
        <Battle musicData={musicData} />
      </Container>
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
