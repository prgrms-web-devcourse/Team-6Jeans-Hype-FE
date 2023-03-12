import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowRight from 'public/images/arrow-right.svg';
import Logo from 'public/images/letter-logo.svg';
import { useState } from 'react';

import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import { getGenreTop10Data } from '@/components/main/GenreTop10Post/api';
import DeskTopPosts from '@/components/main/GenreTop10Post/DeskTopPosts';
import MobilePosts from '@/components/main/GenreTop10Post/MobilePosts';
import RandomBattle from '@/components/main/RandomBattle';
import { getRandomBattleAlbumCoverImage } from '@/components/main/RandomBattle/api';
import Ranking from '@/components/ranking';
import { COLOR } from '@/constants/color';
import { useCheckMobile } from '@/hooks/useCheckMobile';

export default function Home() {
  const { data: randomBattle } = useQuery(['main_getRandomBattleAlbumCoverImage'], getRandomBattleAlbumCoverImage);
  const router = useRouter();
  const { mobile } = useCheckMobile();
  const [genre, setGenre] = useState('');

  const onClickRandomBattle = (battleId: number) => {
    // TODO: 대결 디테일로 이동 (참여한 대결 페이지 만들고 나서 할 것)
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
      <StyledLogo />
      <Label>진행 중인 대결</Label>

      {randomBattle && (
        <StyledRandomBattle battle={randomBattle} onClick={() => onClickRandomBattle(randomBattle.battleId)} />
      )}
      <LikeGenrePost>
        <Wrapper>
          <Label>이런 곡은 어때요?</Label>
        </Wrapper>
        <Genres onChange={onChange} shouldNeedAll />
        {mobile
          ? genreTop10Post && <MobilePosts genreTop10Post={genreTop10Post} navigatePostDetail={navigatePostDetail} />
          : genreTop10Post && <DeskTopPosts genreTop10Post={genreTop10Post} navigatePostDetail={navigatePostDetail} />}
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

const StyledLogo = styled(Logo)`
  width: 6.6rem;
  padding: 2.5rem 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
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
