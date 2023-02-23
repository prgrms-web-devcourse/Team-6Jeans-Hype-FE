import styled from '@emotion/styled';
import ImageLogo from 'public/images/image-logo.svg';
import LetterLogo from 'public/images/letter-logo.svg';
import GoogleLogo from 'public/images/google-logo.svg';

export default function LoginPage() {
  return (
    <Container>
      <StyledImageLogo />
      <StyledLetterLogo />
      <Slogan>What’s your Hype Music?</Slogan>
      <GoogleLoginButton>
        <StyledGoogleLogo />
        Google로 시작하기
      </GoogleLoginButton>
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
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  margin-top: 5.2rem;
  margin-bottom: auto;
`;

const GoogleLoginButton = styled.button`
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

const Footer = styled.footer`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  line-height: 16px;
  color: #9f9f9f;
  margin-top: 5.6rem;
  margin-bottom: 2.2rem;
`;
