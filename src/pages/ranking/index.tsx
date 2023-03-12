import styled from '@emotion/styled';

import Header from '@/components/common/Header';
import Ranking from '@/components/ranking';

function RankingPage() {
  return (
    <Container>
      <Header title='유저랭킹' backUrl='/' />
      <Wrapper>
        <Ranking isLimit={false} />
      </Wrapper>
    </Container>
  );
}

export default RankingPage;

const Container = styled.div`
  overflow: hidden;
  height: 100vh;
`;

const Wrapper = styled.div`
  height: calc(100vh - 12rem);
  overflow-y: scroll;
  padding-bottom: 3rem;
`;
