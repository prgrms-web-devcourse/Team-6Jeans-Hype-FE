import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ListIcon from 'public/images/go-to-list-icon.svg';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import FinishedBattle from '@/components/battle/detail/Battle/Finished';
import Battle from '@/components/battle/detail/Battle/index';
import { useGetBattle } from '@/components/battle/useGetBattle';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import useBattleMusicPlay from '@/hooks/useBattleMusicPlay';

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: battle } = useGetBattle({ initBattleId: Number(id), selectedGenre: 'ALL' });
  const useBattleMusicPlayFunctions = useBattleMusicPlay();

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
        {battle &&
          (battle.isProgress ? (
            <StyledBattle battle={battle} useBattleMusicPlayFunctions={useBattleMusicPlayFunctions} />
          ) : (
            <StyledFinishedBattle battle={battle} useBattleMusicPlayFunctions={useBattleMusicPlayFunctions} />
          ))}
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
  height: 100vh;
  display: grid;
  grid-template-rows: min-content auto;
  box-sizing: border-box;
  padding-bottom: 8rem;
`;

const BATTLE_LAYOUT_STYLE = css`
  margin: auto 0;
  box-sizing: border-box;
  padding-bottom: 1.9rem;
`;

const StyledBattle = styled(Battle)`
  ${BATTLE_LAYOUT_STYLE}
`;

const StyledFinishedBattle = styled(FinishedBattle)`
  ${BATTLE_LAYOUT_STYLE}
`;
