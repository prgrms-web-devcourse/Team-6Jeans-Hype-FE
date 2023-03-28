import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ImageLogo from 'public/images/image-logo.svg';
import LetterLogo from 'public/images/letter-logo.svg';
import React from 'react';

import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import useAuth from '@/components/auth/useAuth';

export default function LoginPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (isLoggedIn) {
    router.push('/');
  }

  return (
    <Container>
      <StyledLink href='/'>
        <Logo>
          <StyledImageLogo />
          <StyledLetterLogo />
          <Slogan>What’s your Hype Music?</Slogan>
        </Logo>
      </StyledLink>
      <GoogleLoginButton />
      <Footer>© 6Jeans. All rights reversed.</Footer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-bottom: auto;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImageLogo = styled(ImageLogo)`
  margin-top: 24.6rem;
`;

const StyledLetterLogo = styled(LetterLogo)`
  margin-top: 3.8rem;
`;

const Slogan = styled.div`
  color: #7893ea;

  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  margin-top: 5.2rem;
`;

const Footer = styled.footer`
  font-weight: 300;
  font-size: 11px;
  line-height: 16px;
  color: #9f9f9f;
  margin-top: 5.6rem;
  margin-bottom: 2.2rem;
`;
