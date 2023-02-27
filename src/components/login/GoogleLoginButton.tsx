import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import GoogleLogo from 'public/images/google-logo.svg';
import { useSetRecoilState } from 'recoil';

import { requestLogin } from './api';
import { accessTokenAtom } from './store';

export default function GoogleLoginButton() {
  const router = useRouter();
  // 임시 코드 (API 요청 로직이 미정)
  const { mutate: login } = useMutation({
    mutationFn: async () => {
      const { accessToken } = await requestLogin();
      return accessToken;
    },
    onSuccess: (token) => {
      setAccessToken(token);
      router.push('/');
    },
  });
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  return (
    <Container onClick={() => login()}>
      <StyledGoogleLogo />
      Google로 시작하기
    </Container>
  );
}

const Container = styled.button`
  position: relative;
  background-color: #ffffff;
  border: 0.4px solid #b7b7b7;
  border-radius: 10px;
  width: calc(100% - 6.8rem);
  padding: 1.5rem 0;
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #848484;
  margin: 0 3.4rem;
`;

const StyledGoogleLogo = styled(GoogleLogo)`
  position: absolute;
  left: 2.2rem;
  top: 1.7rem;
`;
