import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Arrow from 'public/images/arrow-right.svg';
import { ReactNode } from 'react';

import { COLOR } from '@/constants/color';

interface Props {
  title: string;
  hasList: boolean;
  children: ReactNode;
}

function ContentList({ title, hasList, children }: Props) {
  const router = useRouter();
  const { memberId } = router.query;

  const navigateList = [
    { label: '대결', url: `/profile/battle${memberId ? `?memberId=${memberId}` : ''}` },
    { label: '추천', url: `profile/post${memberId ? `?memberId=${memberId}` : ''}` },
    { label: '내 좋아요', url: `profile/likes` },
  ];

  const onRoute = () => {
    const route = navigateList.find(({ label }) => label === title);

    if (route?.url) {
      router.push(route.url);
    }
  };

  return (
    <Container title={title}>
      <Header>
        <Title>{title} 목록</Title>
        {hasList && (
          <Button onClick={onRoute}>
            더보기
            <Arrow />
          </Button>
        )}
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}

export default ContentList;

const Container = styled.div<{ title: string }>`
  width: 90%;
  height: fit-content;
  min-height: 10rem;
  background: ${COLOR.background};
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  margin: 0 auto;
  border-radius: 1rem;
  margin-top: ${({ title }) => title === '대결' && '-5rem'};
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.7rem 2rem;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.4rem;
`;

const Button = styled.button`
  color: ${COLOR.gray};
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
