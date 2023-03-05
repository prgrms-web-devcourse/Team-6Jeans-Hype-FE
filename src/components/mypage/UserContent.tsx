import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import BattleCard from '@/components/battle/Card';
import RecommendationPost from '@/components/common/RecommendationPost';

import { getBattlesLimit, getPostFeedLimit } from './api';
import ContentList from './ContentList';

function UserContent() {
  const { data: postFeedLimit } = useQuery(['postfeedlimit'], getPostFeedLimit);
  const { data: battleLimit } = useQuery(['battlelimit'], getBattlesLimit);

  const battleList = battleLimit?.map((battle) => ({
    id: battle.battleId,
    isProgress: battle.battleStatus === 'PROGRESS',
    challenging: {
      albumCoverImage: battle.challenging.albumUrl,
      title: battle.challenging.title,
      singer: battle.challenging.singer,
    },
    challenged: {
      albumCoverImage: battle.challenged.albumUrl,
      title: battle.challenged.title,
      singer: battle.challenged.singer,
    },
  }));

  return (
    <Container>
      <ContentList title='대결'>
        {battleList?.map(({ id, challenging, challenged, isProgress }) => (
          <BattleCard key={id} id={id} challenging={challenging} challenged={challenged} isProgress={isProgress} />
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
