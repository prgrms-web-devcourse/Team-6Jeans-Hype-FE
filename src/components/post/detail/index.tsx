import { useQuery } from '@tanstack/react-query';
import { getPostDetailData } from './api';
import MusicInfo from './musicInfo';

function PostDetail() {
  const { data, isLoading } = useQuery<any>(['post', 'detail'], getPostDetailData, {});

  return (
    <>
      {isLoading ? (
        <div>로딩 중 입니다</div>
      ) : (
        <>
          <MusicInfo musicData={data.music} />
          <div>소개글 컴포넌트</div>
          <div>대결 신청, 좋아요, 닉네임 컴포넌트</div>
        </>
      )}
    </>
  );
}

export default PostDetail;
