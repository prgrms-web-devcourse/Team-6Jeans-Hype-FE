import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Button {
  src: string;
  text: string;
  path: string;
}

const buttonList = [
  { src: 'main', text: '메인', path: '/' },
  { src: 'battle', text: '대결', path: '/tmp' },
  { src: 'share', text: '공유', path: '/post/searchMusics' },
  { src: 'feed', text: '피드', path: '/post' },
  { src: 'mypage', text: '마이페이지', path: '/tmp' },
];

const BottomNav = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <BottomNavContainer>
      <Buttons>
        {buttonList.map((button: Button) => {
          const { src, text, path } = button;
          const isCLicked = path === pathname;
          return (
            <Link href={path} legacyBehavior key={src}>
              <Button isCLicked={isCLicked}>
                <img src={`/images/bottom-nav/${src}-icon${isCLicked ? '' : '-off'}.svg`} />
                <span>{text}</span>
              </Button>
            </Link>
          );
        })}
      </Buttons>
    </BottomNavContainer>
  );
};

export default BottomNav;

interface styleProp {
  isCLicked: boolean;
}

const BottomNavContainer = styled.div`
  width: 100%;
  max-width: 76.8rem;
  position: fixed;
  bottom: 0;

  display: flex;
  box-shadow: 0.5rem 0 1.5rem rgba(135, 135, 135, 0.7);
  border-radius: 2rem 2rem 0 0;
  height: 8rem; ;
`;

const Buttons = styled.div`
  width: calc(100% - 6rem);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
`;

const Button = styled.button`
  width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    font-size: 1rem;
    line-height: 1.4rem;
    color: ${({ isCLicked }: styleProp) => (isCLicked ? COLOR.purple : COLOR.gray)};
    font-weight: ${({ isCLicked }: styleProp) => (isCLicked ? '700' : '500')};
    margin-top: 0.6rem;
  }
`;
