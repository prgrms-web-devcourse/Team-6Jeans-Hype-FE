import BottomNav from '@/components/common/BottomNav';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import UserContent from '@/components/mypage/UserContent';
import UserHeader from '@/components/mypage/UserHeader';

function Mypage() {
  return (
    <AuthRequiredPage>
      <UserHeader />
      <UserContent />
      <BottomNav />
    </AuthRequiredPage>
  );
}

export default Mypage;
