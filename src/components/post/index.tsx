import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { COLOR } from '@/constants/color';

import AlbumPoster from '../common/AlbumPoster';
import BottomNav from '../common/BottomNav';
import Genres from '../common/Genres';
import Battle from '../common/ImageButtons/BattleButton';
import TextDivider from '../common/TextDivider';
import { getPostFeedData } from './api';

function PostList() {
  const [genre, setGenre] = useState('');
  const [isPossibleBattle, setIsPossibleBattle] = useState<boolean | undefined>(undefined);

  const router = useRouter();

  const { data: postFeed } = useQuery(['postfeed', genre, isPossibleBattle], () => {
    return getPostFeedData({ genre, isPossibleBattle });
  });

  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    setGenre(selectedGenre);
  };

  return (
    <Container>
      <Title>
        <div>한눈에 보는 추천</div>
        <Filter>
          <div>최신순</div>
          <img src='./images/down-arrow-gray.svg' alt='필터 버튼' />
        </Filter>
      </Title>
      <Genres onChange={onChange} />
      {/* <Battles setIsPossibleBattle={setIsPossibleBattle} /> */}

      <FeedPostList>
        {postFeed?.map(
          ({
            postId,
            music: { albumCoverUrl, singer, musicName, genre },
            likeCount,
            isBattlePossible,
            nickname,
          }: PostInfo) => (
            <Post key={postId} onClick={() => navigatePostDetail(postId)}>
              <PostHead>
                <PostHeadInfo>
                  <TextDivider text1={nickname} text2='2020-02-05' />
                </PostHeadInfo>
              </PostHead>
              <PostBody>
                <AlbumPoster lazy={true} size={8} src={albumCoverUrl} />
                <PostmusicInfo>
                  <div>{musicName}</div>
                  <div>
                    <TextDivider text1={singer} text2={genre} />
                  </div>
                </PostmusicInfo>
                <PostIcons>
                  {/* <Battle
                    size={1}
                    battleAbility={false}
                    onClick={() => {
                      console.log('배틀 신청');
                    }}
                  /> */}
                  <Battle
                    size={1}
                    battleAbility={false}
                    onClick={() => {
                      console.log('배틀 신청');
                    }}
                  />
                </PostIcons>
              </PostBody>
            </Post>
          ),
        )}
      </FeedPostList>
      <BottomNav />
    </Container>
  );
}

export default PostList;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  & > div:first-of-type {
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.6rem;
    text-align: center;
    color: ${COLOR.deepBlue};
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4rem;
  text-align: center;

  color: ${COLOR.gray};

  & div {
    margin-right: 0.5rem;
  }
`;

const FeedPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-top: 5rem;
  padding-bottom: 8rem;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const PostHeadInfo = styled.div`
  display: flex;
  align-items: center;

  & div:first-of-type {
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.4rem;
    display: flex;
    align-items: center;

    color: ${COLOR.deepBlue};
  }

  & div:nth-of-type(3) {
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1.2rem;

    color: ${COLOR.gray};
  }
`;

const PostBody = styled.div`
  display: flex;
  align-items: center;
  background: ${COLOR.white};
  box-shadow: 0px 0px 10px rgba(226, 226, 226, 0.25);
  border-radius: 1rem;

  padding-right: 2rem;
  margin: 1rem 0;
`;

const PostmusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 2rem;

  & > div:first-of-type {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.7rem;
    margin-bottom: 0.5rem;

    color: ${COLOR.deepBlue};
  }

  & > div:last-child {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.8rem;

    color: ${COLOR.gray};

    display: flex;
    align-items: center;
  }
`;

const PostIcons = styled.div`
  display: flex;
  align-items: center;

  & div:first-of-type {
    margin-right: 0.25rem;
  }
`;
