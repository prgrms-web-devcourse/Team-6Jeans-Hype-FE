import styled from '@emotion/styled';
import { useQueries } from '@tanstack/react-query';
import MusicListSkeleton from '../common/skeleton/MusicListSkeleton';
import { getMyRanking, getUserRanking } from './api';
import RankingCard from './RankingCard';

function Ranking() {
  const [{ data: userRanking, isLoading: isLoading1 }, { data: myRanking, isLoading: isLoading2 }] = useQueries({
    queries: [
      { queryKey: ['userRanking'], queryFn: getUserRanking },
      { queryKey: ['myRanking'], queryFn: getMyRanking },
    ],
  });

  return (
    <RankingContainer>
      {isLoading1 && isLoading2 ? (
        <>
          <MusicListSkeleton />
          <MusicListSkeleton />
          <MusicListSkeleton />
        </>
      ) : (
        userRanking?.ranking.map((user) => <RankingCard user={user} key={user.memberId} myRanking={myRanking!!} />)
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
