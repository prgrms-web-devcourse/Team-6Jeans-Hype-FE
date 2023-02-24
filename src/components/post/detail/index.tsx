import { useQuery } from '@tanstack/react-query';
import { getPostDetailData } from './api';
import MusicInfo from './musicInfo';
import { useRouter } from 'next/router';
import { PostDetail } from './types';

function PostDetail() {
  const router = useRouter();
  const { postId } = router.query;

  const { data: postDetail } = useQuery<PostDetail>(
    ['post', 'detail', postId],
    () => getPostDetailData(parseInt(postId as string)),
    {
      enabled: !!postId,
    },
  );

  return (
    <>
      <div>음악정보 컴포넌트</div>

      {postDetail && (
        <MusicInfo
          musicName={postDetail.music.musicName}
          musicUrl={postDetail.music.musicUrl}
          thumbnailUrl={postDetail.music.thumbnailUrl}
          singer={postDetail.music.singer}
          genre={postDetail.music.genre}
        />
      )}

      <div>소개글 정보</div>
      {postDetail?.content && (
        <div
          style={{
            width: '400px',
            height: '100px',
            backgroundColor: 'yellow',
            marginBottom: '10px',
          }}
        >
          {postDetail?.content}
        </div>
      )}

      <div>대결, 닉네임, 좋아요 컴포넌트</div>
      <div
        style={{
          width: '400px',
          height: '100px',
          backgroundColor: 'yellow',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {postDetail?.isBattlePossible && <div>대결 신청</div>}
        <div>{postDetail?.nickname}</div>
        <div>{postDetail?.likeCount}</div>
      </div>
    </>
  );
}

export default PostDetail;
