import BottomNav from '@/components/common/BottomNav';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import UserContent from '@/components/profile/UserContent';
import UserHeader from '@/components/profile/UserHeader';

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
