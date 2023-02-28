import { useQuery } from '@tanstack/react-query';
import { getPostFeedData } from './api';
import { PostInfo } from './types';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { COLOR } from '@/constants/color';
import Genres from '../common/Genres';
import { useState } from 'react';
import Battles from '../common/Battles';

function PostList() {
  const [genre, setGenre] = useState('all');

  const router = useRouter();
  const { battle } = router.query;

  const { data: postFeed, isLoading } = useQuery<PostInfo[]>(['postfeed', genre, battle], () => {
    const possibleStatus = battle === 'true' ? true : battle === 'false' ? false : undefined;
    return getPostFeedData(genre, possibleStatus);
  });

  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setGenre(e.target.value);

  return (
    <Container>
      <Genres title='장르 선택' onChange={onChange} />
      <Battles />
      <Title>
        <div>한눈에 보는 추천</div>
        <Filter>
          <div>최신순</div>
          <img src='./images/down-arrow-gray.svg' alt='필터 버튼' />
        </Filter>
      </Title>
      <FeedPostList>
        {postFeed?.map(
          ({ postId, music: { thumbnailUrl, singer, musicName, genre }, likeCount, isBattlePossible, nickname }) => (
            <Post key={postId} onClick={() => navigatePostDetail(postId)}>
              <PostHead>
                <PostHeadInfo>
                  <div>{nickname}</div>
                  <div>2023-02-25</div>
                </PostHeadInfo>
              </PostHead>
              <PostBody>
                <PostmusicThumbnailUrl src={thumbnailUrl} />
                <PostmusicInfo>
                  <div>{musicName}</div>
                  <div>
                    <div>{singer}</div>
                    <div>{genre}</div>
                  </div>
                </PostmusicInfo>
                <PostIcons>
                  <PostIcon>
                    <img src='./images/fire.png' alt='대결 아이콘' />
                    <span>15</span>
                  </PostIcon>
                  <PostIcon>
                    <img src='./images/heart.png' alt='좋아요 아이콘' />
                    <span>15</span>
                  </PostIcon>
                </PostIcons>
              </PostBody>
            </Post>
          ),
        )}
      </FeedPostList>
    </Container>
  );
}

export default PostList;

const Container = styled.div`
  width: 90%;
  margin: 2rem auto;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  margin-top: 1rem;
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

  padding: 0.5rem 2rem 0.5rem 0.5rem;
  margin: 1rem 0;
`;

const PostmusicThumbnailUrl = styled.div<{ src: string }>`
  background-image: url('http://www.akbobada.com/home/akbobada/archive/akbo/img/20150115102222.jpg');
  background-position: center center;
  border: 0.5px solid #dddddd;
  border-radius: 1rem;
  width: 6rem;
  height: 6rem;
`;

const PostmusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
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
`;

const PostIcon = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLOR.blue};
  padding: 0 0.75rem;

  & img {
    margin-bottom: 0.5rem;
  }

  & span {
    font-weight: 500;
    font-size: 0.9rem;
    line-height: 1.4rem;

    text-align: center;
    letter-spacing: -0.01em;
  }
`;
