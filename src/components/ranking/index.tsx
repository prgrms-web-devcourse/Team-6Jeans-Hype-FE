import styled from '@emotion/styled';
import { useQueries } from '@tanstack/react-query';

import { COLOR } from '@/constants/color';

import MusicListSkeleton from '../common/skeleton/MusicListSkeleton';
import { getMyRanking, getUserRanking } from './api';
import RankingCard from './RankingCard';

function Ranking() {
  const [{ data: userRanking, isLoading: isLoadingUserRanking }, { data: myRanking, isLoading: isLoadingMyRanking }] =
    useQueries({
      queries: [
        { queryKey: ['userRanking'], queryFn: getUserRanking },
        { queryKey: ['myRanking'], queryFn: getMyRanking },
      ],
    });

  if (isLoadingUserRanking && isLoadingMyRanking) {
    return (
      <>
        <MusicListSkeleton />
        <MusicListSkeleton />
        <MusicListSkeleton />
      </>
    );
  }

  return (
    <RankingContainer>
      {userRanking?.ranking.length ? (
        userRanking.ranking.map((user) => {
          const isMyRanking = myRanking?.nickname === user.memberNickname && myRanking?.ranking === user.memberRanking;

          return <RankingCard user={user} key={user.memberId} isMyRanking={isMyRanking} />;
        })
      ) : (
        <Empty>등록된 유저가 없습니다</Empty>
      )}
    </RankingContainer>
  );
}

export default Ranking;

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 2rem;
  height: calc(100% - 10rem);
  overflow-y: scroll;
`;

const Empty = styled.div`
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
  color: ${COLOR.gray};
`;
