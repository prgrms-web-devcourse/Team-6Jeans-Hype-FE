import { useQuery } from '@tanstack/react-query';
import { getPostFeedData } from './api';
import { PostInfo } from './types';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

function PostList() {
  const { data: postFeed } = useQuery<PostInfo[]>(['postfeed'], getPostFeedData);

  const router = useRouter();

  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);

  return (
    <FeedContainer>
      <FeedTitle>
        <div>한눈에 보는 추천</div>
        <FeedTitleFilter>
          <div>최신순</div>
          <img src='./images/down-arrow.png' alt='필터 버튼' />
        </FeedTitleFilter>
      </FeedTitle>
      <FeedPostList>
        {postFeed?.map(
          ({ postId, music: { thumbnailUrl, singer, musicName, genre }, likeCount, isBattlePossible, nickname }) => (
            <FeedPost key={postId} onClick={() => navigatePostDetail(postId)}>
              <FeedPostHead>
                <FeedPostHeadInfo>
                  <div>{nickname}</div>
                  <Divider />
                  <div>2023-02-25</div>
                </FeedPostHeadInfo>
                <FeedPostHeadBattle>대결 신청</FeedPostHeadBattle>
              </FeedPostHead>
              <FeedPostBody>
                <PostmusicThumbnailUrl src={thumbnailUrl} />
                <PostmusicInfo>
                  <div>{musicName}</div>
                  <div>
                    <div>{singer}</div>
                    <Divider />
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
              </FeedPostBody>
            </FeedPost>
          ),
        )}
      </FeedPostList>
    </FeedContainer>
  );
}

export default PostList;

const FeedContainer = styled.div`
  width: 90%;
  margin: 2rem auto;
`;

const FeedTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:first-of-type {
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.6rem;
    text-align: center;
    color: #242467;
  }
`;

const FeedTitleFilter = styled.div`
  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4rem;
  text-align: center;

  color: #9f9f9f;

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

const Divider = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  margin: 0 0.75rem;
  border-radius: 50%;
  background-color: #afafaf;
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

    color: #242467;
  }

  & div:nth-of-type(3) {
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1.2rem;

    color: #afafaf;
  }
`;

const FeedPostHeadBattle = styled.div`
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 1.2rem;

  text-align: center;
  letter-spacing: -0.01em;

  color: #7697ec;
`;

const FeedPostBody = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
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

    color: #242467;
  }

  & > div:last-child {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.8rem;

    color: #9f9f9f;

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
  color: #7697ec;
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
