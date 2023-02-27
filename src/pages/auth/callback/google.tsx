import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { GOOGLE_LOGIN_REQUEST_URL } from '@/components/login/constants';
import { accessTokenAtom } from '@/components/login/store';
import { COLOR } from '@/constants/color';

export default function GoogleAuthCallbackPage() {
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const router = useRouter();
  const {
    query: { token },
  } = router;

  if (typeof token === 'string') {
    setAccessToken(token);
    router.push('/');
  } else {
    return (
      <Container>
        <Text>로그인에 실패했습니다</Text>
        <StyledLink href={GOOGLE_LOGIN_REQUEST_URL} replace>
          다시 시도
        </StyledLink>
      </Container>
    );
  }

  return <></>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 2.5rem;
`;

const Text = styled.div`
  font-size: 2rem;
`;

const StyledLink = styled(Link)`
  background-color: ${COLOR.blue};
  color: white;
  border-radius: 1.6rem;
  padding: 1rem;
  font-size: 1.2rem;
`;
