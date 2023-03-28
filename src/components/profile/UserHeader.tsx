import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { getUserProfile } from '@/components/profile/api';
import { COLOR } from '@/constants/color';

import useAuth from '../auth/useAuth';
import ConfirmModal from '../common/modal/Confirm';
import SkeletonCircle from '../common/skeleton/Circle';
import ResultCard from './ResultCard';

interface ResultCard {
  title: string;
  icon: string;
  isHistory?: boolean;
}

export type ResultCardType = 'ranking' | 'point' | 'history';

export const RESULT_CARD_INFO: Record<ResultCardType, ResultCard> = {
  ranking: { title: '랭킹', icon: 'images/rank.svg' },
  point: { title: '포인트', icon: 'images/point.svg' },
  history: { title: '전적', icon: 'images/history.svg', isHistory: true },
};

function UserHeader() {
  const router = useRouter();
  const { memberId } = router.query;
  const { logout } = useAuth();

  const [modalStatus, setModalStatus] = useState(false);

  const { data: userProfile, isLoading } = useQuery(['userProfile', memberId], () => getUserProfile(Number(memberId)));

  const onClickLogout = () => {
    setModalStatus((prev) => !prev);
  };

  return (
    <Container>
      <Wrapper>
        {!memberId && <Logout onClick={onClickLogout}>로그아웃</Logout>}
        <UserContainer>
          <DefaultProfile>
            {isLoading ? (
              <SkeletonCircle width={7} height={7} />
            ) : (
              <img src={userProfile?.profileImageUrl} alt='profile' />
            )}
          </DefaultProfile>
          <Info>
            <Name>{userProfile?.nickname}</Name>
            {userProfile?.countOfChanllenge !== undefined && (
              <RestTicket>남은 대결권 {userProfile?.countOfChanllenge}</RestTicket>
            )}
          </Info>
        </UserContainer>
        <CardContainer>
          <ResultCard type='ranking' info={userProfile?.ranking} />
          <ResultCard type='point' info={userProfile?.victoryPoint} />
          <ResultCard type='history' info={userProfile?.victoryCount} />
        </CardContainer>
      </Wrapper>
      <ConfirmModal
        isOpen={modalStatus}
        text={`로그아웃 하시겠습니까?`}
        onClickCancel={onClickLogout}
        onClickConfirm={logout}
      />
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
  margin: 0 2rem;
  position: relative;
`;

const Logout = styled.div`
  position: absolute;
  right: 0;
  color: ${COLOR.white};
  font-weight: bold;
  cursor: pointer;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 3rem 0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.4rem;
  padding: 1rem 0;
  padding-bottom: 7rem;
`;

const DefaultProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  border-radius: 50%;

  & > img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: calc(100% - 10rem);
  max-width: 22rem;
`;

const Name = styled.h1`
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 2.2rem;
  color: ${COLOR.white};
`;

const RestTicket = styled.div`
  width: fit-content;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 1.3rem;
  border-radius: 5rem;
  color: ${COLOR.white};
`;
