import styled from '@emotion/styled';
import GoogleLogo from 'public/images/google-logo.svg';

import { requestLogin } from './api';

export default function GoogleLoginButton() {
  return (
    <Container onClick={requestLogin}>
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
