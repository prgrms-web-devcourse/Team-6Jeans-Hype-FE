import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useAuth from '@/components/login/useAuth';
import { COLOR } from '@/constants/color';

interface Button {
  src: string;
  text: string;
  path: string;
  onClick?: () => void;
}

const BottomNav = () => {
  const router = useRouter();
  const { asPath } = router;
  const { memberId } = router.query;
  const { openAuthRequiredModal, isLoggedIn } = useAuth();

  const buttonList: Button[] = [
    { src: 'main', text: '메인', path: '/' },
    { src: 'battle', text: '대결', path: '/battle/short' },
    {
      src: 'share',
      text: '추천',
      path: isLoggedIn ? '/post/searchMusics' : '',
      onClick: () => isLoggedIn || openAuthRequiredModal(),
    },
    { src: 'feed', text: '피드', path: '/post' },
    { src: 'mypage', text: '마이페이지', path: memberId ? '' : '/profile' },
  ];

  return (
    <BottomNavContainer>
      <Buttons>
        {buttonList.map((button: Button) => {
          const { src, text, path } = button;
          const isClicked = path === asPath;
          console.log(button, isClicked);

          return (
            <Link href={path} legacyBehavior key={src}>
              <Button isClicked={isClicked} onClick={button.onClick}>
                <img src={`/images/bottom-nav/${src}-icon${isClicked ? '' : '-off'}.svg`} />
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
  isClicked: boolean;
}

const BottomNavContainer = styled.div`
  width: 100%;
  max-width: 76.8rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;

  display: flex;
  box-shadow: 0.5rem 0 1.5rem rgba(135, 135, 135, 0.7);
  border-radius: 2rem 2rem 0 0;
  height: 8rem;
  background-color: ${COLOR.white};
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
    color: ${({ isClicked }: styleProp) => (isClicked ? COLOR.purple : COLOR.gray)};
    font-weight: ${({ isClicked }: styleProp) => (isClicked ? '700' : '500')};
    margin-top: 0.6rem;
  }
`;
