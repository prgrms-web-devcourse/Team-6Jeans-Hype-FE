import Header from '@/components/common/Header';
import Ranking from '@/components/ranking';

function RankingPage() {
  return (
    <>
      <Header title='유저랭킹' shouldNeedBack />
      <Ranking isLimit={false} />
    </>
  );
}

export default RankingPage;
