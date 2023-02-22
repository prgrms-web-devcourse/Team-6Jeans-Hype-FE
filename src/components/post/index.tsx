import { useQuery } from '@tanstack/react-query';
import { getPostFeedData } from './api';
import { ListInfo } from './types';
import { useRouter } from 'next/router';
import { useRef } from 'react';

function PostList() {
  const { data, isLoading } = useQuery<ListInfo[]>(['postfeed'], getPostFeedData);
  const loginStatus = useRef(false);

  const router = useRouter();

  const shiftPostDetail = () => {
    if (loginStatus.current) router.push('/post/detail', '/post/detail');
    else router.push('/auth', '/auth');
  };

  return (
    <>
      {isLoading ? (
        <div>로딩 중 입니다~</div>
      ) : (
        data?.map((post) => (
          <div
            onClick={shiftPostDetail}
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
