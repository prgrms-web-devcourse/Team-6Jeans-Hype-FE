import Link from 'next/link';
import ListIcon from 'public/images/go-to-list-icon.svg';

import Select from '@/components/battle/select';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import useVoteResult from '@/hooks/useVoteResult';

function Short() {
  const { musicData, isLoadingState, selectedBattle, position, onClickGenre, onClickMusic, onClickSkip } =
    useVoteResult();

  return (
    <>
      <Header
        title='진행 중인 대결'
        actionButton={
          <Link href='/battle/list'>
            <ListIcon />
          </Link>
        }
      />
      <Select
        musicData={musicData}
        isLoadingState={isLoadingState}
        selectedBattle={selectedBattle}
        position={position}
        onClickGenre={onClickGenre}
        onClickMusic={onClickMusic}
        onClickSkip={onClickSkip}
      />
      <BottomNav />
    </>
  );
}

export default Short;
