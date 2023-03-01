import styled from '@emotion/styled';

import ResultCard from './ResultCard';

interface ResultCard {
  title: string;
  icon: string;
  info: string;
  isHistory?: boolean;
}

export type ResultCardType = 'ranking' | 'point' | 'history';

export const RESULT_CARD_INFO: Record<ResultCardType, ResultCard> = {
  ranking: { title: '랭킹', icon: 'images/rank.svg', info: '2' },
  point: { title: '포인트', icon: 'images/point.svg', info: '381738173817' },
  history: { title: '전적', icon: 'images/history.svg', info: '109', isHistory: true },
};

function UserHeader() {
  return (
    <Container>
      <Wrapper>
        <CardConatiner>
          <ResultCard type='ranking' />
          <ResultCard type='point' />
          <ResultCard type='history' />
        </CardConatiner>
      </Wrapper>
    </Container>
  );
}

export default UserHeader;

const Container = styled.div`
  height: 40vh;
  background: linear-gradient(130.7deg, #a274dc -10.45%, #658df4 122.15%);
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const CardConatiner = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.4rem;
`;
