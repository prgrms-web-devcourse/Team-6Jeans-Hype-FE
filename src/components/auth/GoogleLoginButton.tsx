import styled from '@emotion/styled';
import Link from 'next/link';
import GoogleLogo from 'public/images/google-logo.svg';

import { GOOGLE_LOGIN_REQUEST_URL } from './constants';

export default function GoogleLoginButton() {
  return (
    <StyledLink href={GOOGLE_LOGIN_REQUEST_URL} replace>
      <StyledGoogleLogo />
      Google로 시작하기
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  position: relative;
  background-color: #ffffff;
  border: 0.4px solid #b7b7b7;
  border-radius: 10px;
  width: calc(100% - 6.8rem);
  padding: 1.5rem 0;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #848484;
  margin: 0 3.4rem;
  text-align: center;
`;

const StyledGoogleLogo = styled(GoogleLogo)`
  position: absolute;
  left: 2.2rem;
  top: 1.7rem;
`;
