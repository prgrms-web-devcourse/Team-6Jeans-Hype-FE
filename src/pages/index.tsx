import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowRight from 'public/images/arrow-right.svg';
import Info from 'public/images/info-icon.svg';
import Logo from 'public/images/letter-logo.svg';
import Survey from 'public/images/survey-icon.svg';
import { useState } from 'react';

import useAuth from '@/components/auth/useAuth';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import NoContent from '@/components/common/NoContent';
import { getGenreTop10Data } from '@/components/main/GenreTop10Post/api';
import DeskTopPosts from '@/components/main/GenreTop10Post/DeskTopPosts';
import MobilePosts from '@/components/main/GenreTop10Post/MobilePosts';
import InfoModal from '@/components/main/Info';
import RandomBattle from '@/components/main/RandomBattle';
import { getRandomBattleAlbumCoverImage } from '@/components/main/RandomBattle/api';
import Ranking from '@/components/Ranking_tmp';
import { COLOR } from '@/constants/color';
import { useCheckMobile } from '@/hooks/useCheckMobile';

export default function Home() {
  const { data: randomBattle } = useQuery(['main_getRandomBattleAlbumCoverImage'], getRandomBattleAlbumCoverImage);
  const router = useRouter();
  const { mobile } = useCheckMobile();
  const [genre, setGenre] = useState('');
  const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
  const { isLoggedIn, openAuthRequiredModal } = useAuth();

  const onClickInfo = () => {
    setIsShowInfo((prev) => !prev);
  };

  const onClickRandomBattle = (battleId: number) => {
    if (!isLoggedIn) {
      openAuthRequiredModal();
      return;
    }
    router.push(`/battle/detail?id=${battleId}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    selectedGenre === 'ALL' ? setGenre('') : setGenre(selectedGenre);
  };

  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);

  const { data: genreTop10Post } = useQuery(['main', 'genreTop10', genre], () => {
    return getGenreTop10Data(genre);
  });

  return (
    <Container>
      <Header>
        <StyledLogo />
        <Icons>
          <button onClick={onClickInfo} title='사용법 알아보기'>
            <StyledInfo />
          </button>
          <Link href='https://forms.gle/QfK3YGMnxuLh6m7LA' legacyBehavior title='설문조사 바로가기'>
            <a target='_blank'>
              <StyledSurvey />
            </a>
          </Link>
        </Icons>
      </Header>
      <Label>오늘의 대결</Label>

      {randomBattle ? (
        <StyledRandomBattle battle={randomBattle} onClick={() => onClickRandomBattle(randomBattle.battleId)} />
      ) : (
        <NoContentWrapper>
          <NoContent text='진행 중인 대결이 없습니다.' isImage width={5} />
        </NoContentWrapper>
      )}
      <LikeGenrePost>
        <Wrapper>
          <Label>이런 곡은 어때요?</Label>
        </Wrapper>
        <Genres onChange={onChange} shouldNeedAll />
        {mobile ? (
          <MobilePosts genreTop10Post={genreTop10Post} navigatePostDetail={navigatePostDetail} />
        ) : (
          <DeskTopPosts genreTop10Post={genreTop10Post} navigatePostDetail={navigatePostDetail} />
        )}
      </LikeGenrePost>
      <RankingLabels>
        <Label>오늘의 TOP 5</Label>
        <Link href='/ranking'>
          <SeeMore>
            더보기 <StyledArrowRight />
          </SeeMore>
        </Link>
      </RankingLabels>
      <Ranking isLimit />
      <BottomNav />
      {isShowInfo ? <InfoModal onClose={onClickInfo} /> : ''}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2.5rem 0;
  align-items: center;
`;

const Icons = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  width: 6.6rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const changeColor = keyframes`
 00% { fill: ${COLOR.blue}; }
 50% { fill: ${COLOR.purple}; } 
 100% { fill: ${COLOR.blue}; }
`;

const StyledInfo = styled(Info)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  & > path {
    animation-name: ${changeColor};
    animation-duration: 6s;
    animation-iteration-count: infinite;
  }
`;

const StyledSurvey = styled(Survey)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  & > path {
    animation-name: ${changeColor};
    animation-duration: 5s;
    animation-iteration-count: infinite;
  }
`;

const Wrapper = styled.div`
  margin-bottom: 1.4rem;
`;

const Label = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
`;

const RankingLabels = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const LikeGenrePost = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  gap: 0.2rem;
`;

const SeeMore = styled.span`
  color: ${COLOR.gray};
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StyledArrowRight = styled(ArrowRight)`
  & > path {
    stroke: ${COLOR.gray};
  }
`;

const StyledRandomBattle = styled(RandomBattle)`
  margin-top: 2rem;
  margin-bottom: 4rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    transition: 0.2s ease-in-out;
  }
`;

const NoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 3rem 0;
`;
