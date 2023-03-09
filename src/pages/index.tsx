import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import { getGenreTop10Data } from '@/components/main/GenreTop10Post/api';
import DeskTopPosts from '@/components/main/GenreTop10Post/DeskTopPosts';
import MobilePosts from '@/components/main/GenreTop10Post/MobilePosts';
import { COLOR } from '@/constants/color';
import { useCheckMobile } from '@/hooks/useCheckMobile';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { mobile } = useCheckMobile();

  const [genre, setGenre] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    selectedGenre === 'ALL' ? setGenre('') : setGenre(selectedGenre);
  };
  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);

  const { data: genreTop10Post } = useQuery(['main', 'genreTop10', genre], () => {
    return getGenreTop10Data(genre);
  });

  return (
    <>
      <Link href='/ranking' style={{ fontWeight: 'bold' }}>
        go to ranking btn
      </Link>

      <LikeGenrePost>
        <Title>이런 곡은 어때요?</Title>
        <Genres onChange={onChange} shouldNeedAll />
        {mobile
          ? genreTop10Post && <MobilePosts genreTop10Post={genreTop10Post} navigatePostDetail={navigatePostDetail} />
          : genreTop10Post && <DeskTopPosts genreTop10Post={genreTop10Post} navigatePostDetail={navigatePostDetail} />}
      </LikeGenrePost>

      <BottomNav />
    </>
  );
}

const LikeGenrePost = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 9.5rem;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.3rem;
  color: ${COLOR.deepBlue};

  margin-bottom: 1rem;
`;
