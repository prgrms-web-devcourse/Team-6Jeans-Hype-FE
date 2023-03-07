import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import Ranking from '@/components/ranking';
import React from 'react';

function RankingPage() {
  return (
    <AuthRequiredPage>
      <Header title='유저랭킹' shouldNeedBack />
      <Ranking />
    </AuthRequiredPage>
  );
}

export default RankingPage;
