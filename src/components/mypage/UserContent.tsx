import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import RecommendationPost from '../common/RecommendationPost';
import { getPostFeedLimit } from './api';
import List from './List';

function UserContent() {
  const { data: postFeedLimit } = useQuery(['postfeedlimit'], getPostFeedLimit);

  return (
    <Container>
      <List title='대결'>
        {/* 추후 대결 컴포넌트로 바꿀 예정 */}
        {postFeedLimit?.map(({ postId, music, likeCount }) => (
          <RecommendationPost
            key={postId}
            postId={postId}
            music={music}
            likeCount={likeCount}
            isBattlePossible={false}
          />
        ))}
      </List>
      <List title='추천'>
        {postFeedLimit?.map(({ postId, music, likeCount }) => (
          <RecommendationPost
            key={postId}
            postId={postId}
            music={music}
            likeCount={likeCount}
            isBattlePossible={false}
          />
        ))}
      </List>
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
