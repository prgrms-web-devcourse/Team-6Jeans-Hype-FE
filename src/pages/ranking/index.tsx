import Header from '@/components/common/Header';
import Ranking from '@/components/ranking';

function RankingPage() {
  return (
    <>
      <Header title='유저랭킹' backUrl='/' />
      <Ranking isLimit={false} />
    </>
  );
}

export default RankingPage;
