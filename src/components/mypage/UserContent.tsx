import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import BattleCard from '@/components/battle/Card';
import RecommendationPost from '@/components/common/RecommendationPost';

import FinishedBattleCard from '../battle/Card/Finished';
import { FinishedBattleMusic } from '../battle/list/types';
import { getPostFeedLimit } from './api';
import { useGetMyBattleList } from './battle/useGetMyBattleList';
import ContentList from './ContentList';

function UserContent() {
  const { data: postFeedLimit } = useQuery(['postfeedlimit'], getPostFeedLimit);
  const { data: battleLimit } = useGetMyBattleList({ limit: 2 });

  return (
    <Container>
      <ContentList title='대결'>
        {battleLimit?.map(({ id, challenging, challenged, battleStatus }) =>
          battleStatus === 'PROGRESS' ? (
            <BattleCard key={id} challenging={challenging} challenged={challenged} />
          ) : (
            <FinishedBattleCard
              key={id}
              challenging={challenging as FinishedBattleMusic}
              challenged={challenged as FinishedBattleMusic}
            />
          ),
        )}
      </ContentList>
      <ContentList title='추천'>
        {postFeedLimit?.map(({ postId, music, likeCount }) => (
          <RecommendationPost
            key={postId}
            postId={postId}
            music={music}
            likeCount={likeCount}
            isBattlePossible={false}
          />
        ))}
      </ContentList>
    </Container>
  );
}

export default UserContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 10rem;
`;
