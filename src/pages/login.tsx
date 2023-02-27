import styled from '@emotion/styled';
import ImageLogo from 'public/images/image-logo.svg';
import LetterLogo from 'public/images/letter-logo.svg';

import GoogleLoginButton from '@/components/login/GoogleLoginButton';

export default function LoginPage() {
  return (
    <Container>
      <StyledImageLogo />
      <StyledLetterLogo />
      <Slogan>What’s your Hype Music?</Slogan>
      <GoogleLoginButton />
      <Footer>© 6Jeans. All rights reversed.</Footer>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
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
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  margin-top: 5.2rem;
  margin-bottom: auto;
`;

const Footer = styled.footer`
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  line-height: 16px;
  color: #9f9f9f;
  margin-top: 5.6rem;
  margin-bottom: 2.2rem;
`;
