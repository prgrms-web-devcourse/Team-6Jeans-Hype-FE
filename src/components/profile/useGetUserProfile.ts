import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getUserProfile } from './api';
import { UserInfo } from './types';

export const useGetUserProfile = () => {
  const [memberId, setMemberId] = useState<number | undefined>();

  const { data: userProfile } = useQuery<UserInfo>(
    ['userProfile', memberId],
    async () => await getUserProfile(memberId && memberId),
  );

  return { memberId, setMemberId, userProfile };
};
