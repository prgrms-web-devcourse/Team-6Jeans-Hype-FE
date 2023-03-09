import BottomNav from '@/components/common/BottomNav';
import GenreTop10Post from '@/components/main/GenreTop10Post';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href='/ranking' style={{ fontWeight: 'bold' }}>
        go to ranking btn
      </Link>
      <GenreTop10Post />
      <BottomNav />
    </>
  );
}
