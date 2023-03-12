import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { accessTokenAtom, isOpenedAuthRequiredModalAtom } from './store';
import { tokenStorage } from './utils/localStorage';

export default function useAuth() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setIsOpenedAuthRequiredModal = useSetRecoilState(isOpenedAuthRequiredModalAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  const openAuthRequiredModal = () => {
    setIsOpenedAuthRequiredModal(true);
  };

  const getAccessToken = () => {
    return accessToken;
  };

  const logout = () => {
    tokenStorage.remove();
    setAccessToken(null);
    router.push('/');
  };

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  return { openAuthRequiredModal, isLoggedIn, logout, getAccessToken };
}
