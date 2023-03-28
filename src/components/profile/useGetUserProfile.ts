import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getUserProfile } from './api';

export const useGetUserProfile = () => {
  const [memberId, setMemberId] = useState<number | undefined>();

  const { data: userProfile } = useQuery(
    ['userProfile', memberId],
    async () => await getUserProfile(memberId && memberId),
  );

  return { memberId, setMemberId, userProfile };
};
