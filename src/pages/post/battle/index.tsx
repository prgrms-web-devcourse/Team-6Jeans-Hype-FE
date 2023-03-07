import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import BattleForm from '@/components/post/battle';

function Battle() {
  return (
    <AuthRequiredPage>
      <BattleForm />
    </AuthRequiredPage>
  );
}

export default Battle;
