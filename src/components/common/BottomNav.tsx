import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BattleOnIcon from 'public/images/bottom-nav/battle-icon.svg';
import BattleIcon from 'public/images/bottom-nav/battle-icon-off.svg';
import FeedOnIcon from 'public/images/bottom-nav/feed-icon.svg';
import FeedIcon from 'public/images/bottom-nav/feed-icon-off.svg';
import MainOnIcon from 'public/images/bottom-nav/main-icon.svg';
import MainIcon from 'public/images/bottom-nav/main-icon-off.svg';
import MypageOnIcon from 'public/images/bottom-nav/mypage-icon.svg';
import MypageIcon from 'public/images/bottom-nav/mypage-icon-off.svg';
import ShareOnIcon from 'public/images/bottom-nav/share-icon.svg';
import ShareIcon from 'public/images/bottom-nav/share-icon-off.svg';

import useAuth from '@/components/auth/useAuth';
import { COLOR } from '@/constants/color';

interface Button {
  src: (isClicked: boolean) => void;
  text: string;
  paths: string[];
  onClick?: () => void;
}

const BottomNav = () => {
  const router = useRouter();
  const { asPath } = router;
  const { openAuthRequiredModal, isLoggedIn } = useAuth();

  const buttonList: Button[] = [
    {
      src: (isClicked: boolean) => (isClicked ? <MainOnIcon /> : <MainIcon />),
      text: '메인',
      paths: ['/'],
    },
    {
      src: (isClicked: boolean) => (isClicked ? <BattleOnIcon /> : <BattleIcon />),
      text: '대결',
      paths: isLoggedIn ? ['/battle/short', '/battle/list'] : ['/battle/list', '/battle/short'],
    },
    {
      src: (isClicked: boolean) => (isClicked ? <ShareOnIcon /> : <ShareIcon />),
      text: '추천',
      paths: [isLoggedIn ? '/post/searchMusics' : ''],
      onClick: () => isLoggedIn || openAuthRequiredModal(),
    },
    {
      src: (isClicked: boolean) => (isClicked ? <FeedOnIcon /> : <FeedIcon />),
      text: '피드',
      paths: ['/post'],
    },
    {
      src: (isClicked: boolean) => (isClicked ? <MypageOnIcon /> : <MypageIcon />),
      text: '마이페이지',
      paths: [isLoggedIn ? '/profile' : ''],
      onClick: () => isLoggedIn || openAuthRequiredModal(),
    },
  ];

  return (
    <BottomNavContainer>
      <Buttons>
        {buttonList.map((button: Button, i: number) => {
          const { src, text, paths } = button;
          const isClicked = paths.find((path) => path === asPath) !== undefined;

          return (
            <Link href={paths[0]} legacyBehavior key={i}>
              <Button onClick={button.onClick}>
                <>
                  {src(isClicked)}
                  <Text isClicked={isClicked}>{text}</Text>
                </>
              </Button>
            </Link>
          );
        })}
      </Buttons>
    </BottomNavContainer>
  );
};

export default BottomNav;

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
`;

const Text = styled.span<{ isClicked: boolean }>`
  font-size: 1rem;
  line-height: 1.4rem;
  color: ${({ isClicked }) => (isClicked ? COLOR.purple : COLOR.gray)};
  font-weight: ${({ isClicked }) => (isClicked ? '700' : '500')};
  margin-top: 0.6rem;
`;
