import { useQuery } from '@tanstack/react-query';
import { getPostFeedData } from './api';

function PostFeed() {
  const { data, isLoading } = useQuery(['postfeed'], getPostFeedData);

  return (
    <>
      {data?.map((post) => (
        <div
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
        </div>
      ))}
    </>
  );
}

export default PostFeed;
