import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

import { RESULT_CARD_INFO, ResultCardType } from './UserHeader';

interface Props {
  type: ResultCardType;
}

function ResultCard({ type }: Props) {
  const { title, icon, info, isHistory } = RESULT_CARD_INFO[type];
  return (
    <Container>
      <Title>{title}</Title>
      <Wrapper>
        <img src={icon} alt='info-icon' />
        <Info>
          {info} {isHistory && 'WIN'}
        </Info>
      </Wrapper>
    </Container>
  );
}

export default ResultCard;

const Container = styled.div`
  width: 7.2rem;
  height: 4.3rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  color: ${COLOR.white};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1.2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Info = styled.h2`
  font-weight: 500;
  font-size: 1.2rem;
  width: 5.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
