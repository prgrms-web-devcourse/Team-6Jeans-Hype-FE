import Link from 'next/link';
import { useRouter } from 'next/router';
import ShuffleIcon from 'public/images/go-to-shuffle-icon.svg';

import Select from '@/components/battle/select';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import useVoteResult from '@/hooks/useVoteResult';

function Detail() {
  const router = useRouter();
  const { musicData, isLoadingState, selectedBattle, position, onClickGenre, onClickMusic, onClickSkip } =
    useVoteResult(Number(router.query.id));

  return router.query.id ? (
    <AuthRequiredPage>
      <Header
        title='진행 중인 대결'
        actionButton={
          <Link href='/post/battle/short'>
            <ShuffleIcon />
          </Link>
        }
      />
      <Select
        battleId={Number(router.query.id)}
        musicData={musicData}
        isLoadingState={isLoadingState}
        selectedBattle={selectedBattle}
        position={position}
        onClickGenre={onClickGenre}
        onClickMusic={onClickMusic}
        onClickSkip={onClickSkip}
      />
      <BottomNav />
    </AuthRequiredPage>
  ) : (
    <div>id 없음</div>
  );
}

export default Detail;
