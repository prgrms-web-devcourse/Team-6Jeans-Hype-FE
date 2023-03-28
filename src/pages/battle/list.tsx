import styled from '@emotion/styled';
import Link from 'next/link';
import ShortsIcon from 'public/images/shuffle.svg';
import { useState } from 'react';

import useAuth from '@/components/auth/useAuth';
import { BATTLE_STATUS_NAME_LIST, BATTLE_STATUS_VALUE_MAP } from '@/components/battle/constants';
import BattleList from '@/components/battle/List_tmp';
import { GenreValue, isGenreValue } from '@/components/battle/List_tmp/types';
import { useGetBattleList } from '@/components/battle/List_tmp/useGetBattles';
import { BattleStatusName } from '@/components/battle/types';
import BottomNav from '@/components/common/BottomNav';
import Filter from '@/components/common/Filter';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import NoContent from '@/components/common/NoContent';

export default function BattleListPage() {
  const [genreValue, setGenreValue] = useState<GenreValue | undefined>();
  const [status, setStatus] = useState<BattleStatusName>('진행중');
  const { data: battleList } = useGetBattleList({
    genre: genreValue,
    status: BATTLE_STATUS_VALUE_MAP[status],
  });
  const { isLoggedIn, openAuthRequiredModal } = useAuth();

  const onChangeGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenreValue = e.target.value;
    if (selectedGenreValue === 'ALL') {
      setGenreValue(undefined);
      return;
    }
    if (!isGenreValue(selectedGenreValue)) {
      return;
    }
    setGenreValue(selectedGenreValue);
  };

  const onChangeFilter = (option: BattleStatusName) => {
    setStatus(option);
  };

  const ShortNavigationButton = isLoggedIn ? (
    <Link href='/battle/short'>
      <ShortsIcon />
    </Link>
  ) : (
    <ShortsIcon onClick={() => openAuthRequiredModal()} />
  );

  return (
    <Container>
      <Header title='한 눈에 보는 대결' shouldNeedBack={false} actionButton={ShortNavigationButton} />
      <Content>
        <StyledGenres shouldNeedAll onChange={onChangeGenre} />
        <Filter selected={status} options={BATTLE_STATUS_NAME_LIST} onChange={onChangeFilter} />
        {battleList?.length ? (
          <StyledBattleList battleList={battleList} />
        ) : (
          <Wrapper>
            <NoContent text='생성된 대결이 없습니다.' isImage width={8} />
          </Wrapper>
        )}
      </Content>
      <BottomNav />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

const Content = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 9.5rem;
`;

const StyledGenres = styled(Genres)`
  margin-bottom: 1.4rem;
`;

const StyledBattleList = styled(BattleList)`
  height: calc(100vh - 25rem);
  overflow-y: auto;
  margin-top: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 1.5rem;
`;
