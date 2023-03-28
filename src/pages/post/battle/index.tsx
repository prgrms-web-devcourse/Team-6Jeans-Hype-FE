import styled from '@emotion/styled';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BattleForm from '@/components/post/battle';

function Battle() {
  return (
    <AuthRequiredPage>
      <Container>
        <BattleForm />
      </Container>
    </AuthRequiredPage>
  );
}

export default Battle;

const Container = styled.div`
  height: 100vh;
`;
