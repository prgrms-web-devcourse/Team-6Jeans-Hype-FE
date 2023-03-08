import BottomNav from '@/components/common/BottomNav';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href='/ranking' style={{ fontWeight: 'bold' }}>
        go to ranking btn
      </Link>
      <BottomNav />
    </>
  );
}
