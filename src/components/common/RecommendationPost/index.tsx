import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import AlbumPoster from '@/components/common/AlbumPoster';
import Battle from '@/components/common/ImageButtons/BattleButton';
import TextDivider from '@/components/common/TextDivider';
import { PostInfo } from '@/components/post/types';
import { COLOR } from '@/constants/color';

function RecommendationPost({
  postId,
  music: { albumCoverUrl, singer, musicName, genre },
  likeCount,
  isBattlePossible,
  nickname,
}: PostInfo) {
  const router = useRouter();

  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);

  return (
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
  );
}

export default RecommendationPost;

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
