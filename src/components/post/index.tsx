import { useQuery } from '@tanstack/react-query';
import { getPostFeedData } from './api';
import { PostInfo } from './types';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { COLOR } from '@/constants/color';
import Genres from '../common/Genres';
import { useState } from 'react';
import Battles from '../common/Battles';
import TextDivider from '../common/TextDivider';
import Battle from '../common/ImageButtons/BattleButton';
import BottomNav from '../common/BottomNav';
import AlbumPoster from '../common/AlbumPoster';

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
      {/* <Battles /> */}
      <Title>
        <div>한눈에 보는 추천</div>
        <Filter>
          <div>최신순</div>
          <img src='./images/down-arrow.png' alt='필터 버튼' />
        </Filter>
      </Title>
      <Genres onChange={onChange} />
      <FeedPostList>
        {postFeed?.map(
          ({ postId, music: { thumbnailUrl, singer, musicName, genre }, likeCount, isBattlePossible, nickname }) => (
            <FeedPost key={postId} onClick={() => navigatePostDetail(postId)}>
              <FeedPostHead>
                <FeedPostHeadInfo>
                  <TextDivider text1={nickname} text2='2020-02-05' />
                </FeedPostHeadInfo>
              </FeedPostHead>
              <FeedPostBody>
                <AlbumPoster
                  lazy={true}
                  size={8}
                  src='http://www.akbobada.com/home/akbobada/archive/akbo/img/20150115102222.jpg'
                />
                <PostmusicInfo>
                  <div>{musicName}</div>
                  <div>
                    <TextDivider text1={singer} text2={genre} />
                  </div>
                </PostmusicInfo>
                <PostIcons>
                  <Battle
                    size={1}
                    battleAbility={false}
                    onClick={() => {
                      console.log('배틀 신청');
                    }}
                  />
                  <Battle
                    size={1}
                    battleAbility={false}
                    onClick={() => {
                      console.log('배틀 신청');
                    }}
                  />
                </PostIcons>
              </FeedPostBody>
            </FeedPost>
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

const FeedPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FeedPostHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const FeedPostHeadInfo = styled.div`
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

const FeedPostBody = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
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
