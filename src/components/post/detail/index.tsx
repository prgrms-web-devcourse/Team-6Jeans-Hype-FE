import { useQuery } from '@tanstack/react-query';
import { getPostDetailData } from './api';
import MusicInfo from './musicInfo';
import { useRouter } from 'next/router';
import { PostDetailInfo } from './types';

function PostDetail() {
  const router = useRouter();
  const { postId } = router.query;

  const { data, isLoading } = useQuery<PostDetailInfo>(['post', 'detail', postId], () =>
    getPostDetailData(parseInt(postId as string)),
  );

  const navigatePostBattle = () => {
    router.push(`/post/battle?postId=${postId}`);
  };

  return (
    <>
      {isLoading || !data ? (
        <div>로딩 중 입니다</div>
      ) : (
        <>
          <div>음악정보 컴포넌트</div>
          <MusicInfo musicData={data.music} />

          <div>소개글 정보</div>
          {data.content && (
            <div
              style={{
                width: '400px',
                height: '100px',
                backgroundColor: 'yellow',
                marginBottom: '10px',
              }}
            >
              {data.content}
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
            {data.isBattlePossible && <div onClick={navigatePostBattle}>대결 신청</div>}
            <div>{data.nickname}</div>
            <div>{data.likeCount}</div>
          </div>
        </>
      )}
    </>
  );
}

export default PostDetail;
