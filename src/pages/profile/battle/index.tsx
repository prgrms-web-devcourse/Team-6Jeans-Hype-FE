import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import { BATTLE_STATUS_NAME_LIST, BATTLE_STATUS_VALUE_MAP } from '@/components/battle/constants';
import BattleList from '@/components/battle/List';
import { GenreValue, isGenreValue } from '@/components/battle/List/types';
import { BattleStatusName } from '@/components/battle/types';
import BottomNav from '@/components/common/BottomNav';
import Filter from '@/components/common/Filter';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import NoContent from '@/components/common/NoContent';
import { useGetMyBattleList } from '@/components/profile/battle/useGetMyBattleList';

export default function MyBattleListPage() {
  const [genreValue, setGenreValue] = useState<GenreValue | undefined>();
  const [status, setStatus] = useState<BattleStatusName>('진행중');
  const router = useRouter();
  const { data: myBattleList } = useGetMyBattleList({
    genre: genreValue,
    status: BATTLE_STATUS_VALUE_MAP[status],
    memberId: router.query.memberId && !isNaN(+router.query.memberId) ? +(router.query.memberId as string) : undefined,
  });

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

  return (
    <AuthRequiredPage>
      <Container>
        <Header title='참여한 대결' />
        <Content>
          <Genres shouldNeedAll onChange={onChangeGenre} />
          <Filter selected={status} options={BATTLE_STATUS_NAME_LIST} onChange={onChangeFilter} />
          {myBattleList?.length ? (
            <StyledBattleList battleList={myBattleList} />
          ) : (
            <Wrapper>
              <NoContent text='참여한 대결이 없습니다.' isImage width={8} />
            </Wrapper>
          )}
        </Content>
        <BottomNav />
      </Container>
    </AuthRequiredPage>
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
