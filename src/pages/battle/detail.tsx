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
      <Container>
        <Header
          title={getHeaderTitle()}
          actionButton={
            <Link href='/battle/list'>
              <ListIcon />
            </Link>
          }
        />
        {battle && (battle.isProgress ? <StyledBattle battle={battle} /> : <StyledFinishedBattle battle={battle} />)}
        <BottomNav />
      </Container>
    </AuthRequiredPage>
  ) : (
    <div>id 없음</div>
  );
}

export default Detail;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content auto;
  box-sizing: border-box;
  padding-bottom: 8rem;
`;

const StyledBattle = styled(Battle)`
  margin: auto 0;
  box-sizing: border-box;
  padding-bottom: 2rem;
`;

const StyledFinishedBattle = styled(FinishedBattle)`
  margin: auto 0;
  box-sizing: border-box;
  padding-bottom: 2rem;
`;
