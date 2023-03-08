import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import BattleCard from '@/components/battle/Card';
import RecommendationPost from '@/components/common/RecommendationPost';

import { getBattlesLimit, getPostFeedLimit } from './api';
import ContentList from './ContentList';

function UserContent() {
  const { data: postFeedLimit } = useQuery(['postfeedlimit'], getPostFeedLimit);
  const { data: battleLimit } = useQuery(['battlelimit'], getBattlesLimit);

  return (
    <Container>
      <ContentList title='대결'>
        {battleLimit?.map(({ battleId, challenging, challenged }) => (
          <BattleCard
            key={battleId}
            challenging={{
              albumCoverImage: challenging.albumUrl,
              title: challenging.title,
              singer: challenging.singer,
            }}
            challenged={{
              albumCoverImage: challenged.albumUrl,
              title: challenged.title,
              singer: challenged.singer,
            }}
          />
        ))}
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
