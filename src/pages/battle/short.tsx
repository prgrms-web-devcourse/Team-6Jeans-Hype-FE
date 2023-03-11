import styled from '@emotion/styled';
import Link from 'next/link';
import ListIcon from 'public/images/go-to-list-icon.svg';
import { useState } from 'react';

import Detail from '@/components/battle/detail/Battle';
import { useGetBattle } from '@/components/battle/detail/useGetBattle';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';

function Short() {
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const { data: musicData, refetch } = useGetBattle({ initBattleId: 0, selectedGenre });

  const onClickGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingState(true);
    setSelectedGenre(e.target.value);
    setTimeout(() => {
      setIsLoadingState(false);
    }, 500);
  };

  const onClickSkip = () => {
    setIsLoadingState(true);
    refetch();
    setTimeout(() => {
      setIsLoadingState(false);
    }, 500);
  };

  return (
    <>
      <Header
        title='진행 중인 대결'
        shouldNeedBack={false}
        actionButton={
          <Link href='/battle/list'>
            <ListIcon />
          </Link>
        }
      />
      <Container>
        <Genres onChange={onClickGenre} shouldNeedAll />
        <Detail musicData={musicData} isLoadingState={isLoadingState} refetch={refetch} onClickSkip={onClickSkip} />
      </Container>
      <BottomNav />
    </>
  );
}

export default Short;

const Container = styled.div`
  width: calc(100% - 4rem);
  height: calc(100vh - 22rem);
  padding: 0 2rem;
  min-height: 45rem;
  margin-bottom: 10rem;
`;
