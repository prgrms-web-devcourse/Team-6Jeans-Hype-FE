import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import BattleCard from '@/components/battle/Card';
import NoContent from '@/components/common/NoContent';
import RecommendationPost from '@/components/common/RecommendationPost';

import { getBattlesLimit, getPostFeedLimit } from './api';
import ContentList from './ContentList';

function UserContent() {
  const { data: postFeedLimit } = useQuery(['postfeedlimit'], getPostFeedLimit);
  const { data: battleLimit } = useQuery(['battlelimit'], getBattlesLimit);

  return (
    <Container>
      <ContentList title='대결'>
        {battleLimit ? (
          battleLimit.map(({ battleId, challenging, challenged, battleStatus }) => (
            <BattleCard
              key={battleId}
              id={battleId}
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
              isProgress={battleStatus === 'PROGRESS'}
            />
          ))
        ) : (
          <Wrapper>
            <NoContent width={5} text='참여한 대결이 없습니다.' isImage={true} />
          </Wrapper>
        )}
      </ContentList>
      <ContentList title='추천'>
        {postFeedLimit ? (
          postFeedLimit.map(({ postId, music, likeCount }) => (
            <RecommendationPost
              key={postId}
              postId={postId}
              music={music}
              likeCount={likeCount}
              isBattlePossible={false}
            />
          ))
        ) : (
          <Wrapper>
            <NoContent width={5} text='작성한 추천 글이 없습니다.' isImage={true} />
          </Wrapper>
        )}
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;
