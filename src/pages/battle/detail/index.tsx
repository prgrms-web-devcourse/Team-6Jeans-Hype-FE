import Link from 'next/link';
import { useRouter } from 'next/router';
import ShuffleIcon from 'public/images/go-to-shuffle-icon.svg';

import Select from '@/components/battle/select';
import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';

function Detail() {
  const router = useRouter();

  return router.query.id ? (
    <>
      <Header
        title='진행 중인 대결'
        actionButton={
          <Link href='/post/battle/short'>
            <ShuffleIcon />
          </Link>
        }
      />
      <Select battleId={Number(router.query.id)} />
      <BottomNav />
    </>
  ) : (
    <div>id 없음</div>
  );
}

export default Detail;
