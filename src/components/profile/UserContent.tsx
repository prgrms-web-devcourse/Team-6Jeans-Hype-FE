import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import BattleCard from '@/components/battle/Card';
import FinishedBattleCard from '@/components/battle/Card/Finished';
import NoContent from '@/components/common/NoContent';
import RecommendationPost from '@/components/common/RecommendationPost';

import { FinishedBattleMusic } from '../battle/list/types';
import { getPostFeedLimit } from './api';
import { useGetMyBattleList } from './battle/useGetMyBattleList';
import ContentList from './ContentList';

function UserContent() {
  const router = useRouter();
  const { memberId } = router.query;

  const { data: battleLimit } = useGetMyBattleList({
    limit: 2,
    memberId: memberId && !isNaN(+memberId) ? +memberId : undefined,
  });
  const { data: postFeedLimit } = useQuery(
    ['postfeedlimit', memberId],
    async () => await getPostFeedLimit(Number(memberId)),
  );

  const navigateDetail = (battleId: number) => {
    router.push(`/battle/detail?id=${battleId}`);
  };

  return (
    <Container>
      <ContentList title='대결' hasList={battleLimit?.length !== 0}>
        {battleLimit?.length ? (
          battleLimit.map(({ id, challenging, challenged, battleStatus }) =>
            battleStatus === 'PROGRESS' ? (
              <BattleCard
                onClick={() => navigateDetail(id)}
                key={id}
                challenging={challenging}
                challenged={challenged}
              />
            ) : (
              <FinishedBattleCard
                onClick={() => navigateDetail(id)}
                key={id}
                challenging={challenging as FinishedBattleMusic}
                challenged={challenged as FinishedBattleMusic}
              />
            ),
          )
        ) : (
          <Wrapper>
            <NoContent width={5} text='참여한 대결이 없습니다.' isImage={true} />
          </Wrapper>
        )}
      </ContentList>
      <ContentList title='추천' hasList={postFeedLimit?.length !== 0}>
        {postFeedLimit?.length ? (
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
