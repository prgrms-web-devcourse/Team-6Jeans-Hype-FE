import styled from '@emotion/styled';
import Link from 'next/link';
import ListIcon from 'public/images/go-to-list-icon.svg';
import { useState } from 'react';

import Battle from '@/components/battle/detail/Battle';
import { useGetBattle } from '@/components/battle/detail/useGetBattle';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import useBattleMusicPlay from '@/hooks/useBattleMusicPlay';

function Short() {
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const { data: musicData, refetch } = useGetBattle({ initBattleId: 0, selectedGenre });
  const useBattleMusicPlayFunctions = useBattleMusicPlay();

  const onClickGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingState(true);
    setSelectedGenre(e.target.value);
    useBattleMusicPlayFunctions.init();
    setTimeout(() => {
      setIsLoadingState(false);
    }, 500);
  };

  const onClickSkip = () => {
    setIsLoadingState(true);
    refetch();
    useBattleMusicPlayFunctions.init();
    setTimeout(() => {
      setIsLoadingState(false);
    }, 500);
  };

  return (
    <AuthRequiredPage>
      <Container>
        <Header
          title='진행 중인 대결'
          shouldNeedBack={false}
          actionButton={
            <Link href='/battle/list'>
              <ListIcon />
            </Link>
          }
        />
        <BattleWrapper>
          <GenresWrapper>
            <Genres onChange={onClickGenre} shouldNeedAll />
          </GenresWrapper>
          <StyledBattle
            battle={musicData}
            isLoadingState={isLoadingState}
            refetch={refetch}
            onClickSkip={onClickSkip}
            useBattleMusicPlayFunctions={useBattleMusicPlayFunctions}
          />
        </BattleWrapper>
        <BottomNav />
      </Container>
    </AuthRequiredPage>
  );
}

export default Short;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: min-content auto;
  box-sizing: border-box;
  padding-bottom: 8rem;
`;

const BattleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;
`;

const StyledBattle = styled(Battle)`
  margin: auto 0;
  box-sizing: border-box;
  padding-bottom: 2rem;
`;

const GenresWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 2rem;
  position: absolute;
  top: 0;
  left: 0;
`;
