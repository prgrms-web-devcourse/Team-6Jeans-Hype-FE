import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

import DefaultImage from '../../../public/images/default-profile.svg';
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
        <UserContainer>
          <DefaultProfile>
            <DefaultImage />
          </DefaultProfile>
          <Info>
            <Name>아몰랑인데요?</Name>
            <RestTicket>남은 대결권 2</RestTicket>
          </Info>
        </UserContainer>
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
  height: fit-content;
  background: linear-gradient(130.7deg, #a274dc -10.45%, #658df4 122.15%);
  padding: 2rem 0;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-left: -11.5rem;
  padding: 3rem 0;
`;

const CardConatiner = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.4rem;
  padding: 1rem 0;
  padding-bottom: 7rem;
`;

const DefaultProfile = styled.div`
  width: 7.7rem;
  height: 7.7rem;
  border-radius: 50%;
  background-color: ${COLOR.white};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Name = styled.h1`
  font-weight: 500;
  font-size: 1.7rem;
  color: ${COLOR.white};
`;

const RestTicket = styled.div`
  width: fit-content;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 1.3rem;
  border-radius: 5rem;
  color: ${COLOR.white};
`;
