import BottomNav from '@/components/common/BottomNav';
import UserContent from '@/components/mypage/UserContent';
import UserHeader from '@/components/mypage/UserHeader';

function Mypage() {
  return (
    <>
      <UserHeader />
      <UserContent />
      <BottomNav />
    </>
  );
}

export default Mypage;
