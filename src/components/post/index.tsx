import { useQuery } from '@tanstack/react-query';
import { getPostFeedData } from './api';
import { PostInfo } from './types';
import { useRouter } from 'next/router';

function PostList() {
  const { data: postFeed, isLoading } = useQuery<PostInfo[]>(['postfeed'], getPostFeedData);

  const router = useRouter();

  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        postFeed?.map((post) => (
          <div
            key={post.postId}
            onClick={() => navigatePostDetail(post.postId)}
            style={{
              width: '130px',
              height: '130px',
              backgroundColor: 'yellow',
              marginBottom: '10px',
            }}
          >
            <div>사진 url : {post.music.thumbnailUrl}</div>
            <div>
              {post.music.singer} - {post.music.musicName}
            </div>
            <div>좋아요 {post.likeCount}</div>
            <div>{post.isBattlePossible && '대결 가능'}</div>
            <div>닉네임 {post.nickname}</div>
            <div>장르 {post.music.genre}</div>
          </div>
        ))
      )}
    </>
  );
}

export default PostList;
