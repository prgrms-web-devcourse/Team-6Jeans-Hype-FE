import Link from 'next/link';
import ListIcon from 'public/images/go-to-list-icon.svg';

import Select from '@/components/battle/select';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';

function Short() {
  return (
    <>
      <Header
        title='진행 중인 대결'
        actionButton={
          <Link href='/post/battle/list'>
            <ListIcon />
          </Link>
        }
      />
      <Select />
      <BottomNav />
    </>
  );
}

export default Short;
