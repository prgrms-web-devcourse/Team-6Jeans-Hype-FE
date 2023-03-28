import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getIsValidToken } from './api';
import { accessTokenAtom, isCheckedTokenAtom, isOpenedAuthRequiredModalAtom } from './store';
import { tokenStorage } from '../../utils/localStorage';

export default function useAuth() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setIsOpenedAuthRequiredModal = useSetRecoilState(isOpenedAuthRequiredModalAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [isCheckedToken, setIsCheckedToken] = useRecoilState(isCheckedTokenAtom);

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

  const checkToken = async () => {
    const isValidToken = await getIsValidToken();
    if (!isValidToken) {
      tokenStorage.remove();
      setAccessToken(null);
    }
  };

  useEffect(() => {
    if (!isCheckedToken) {
      checkToken();
      setIsCheckedToken(true);
    }

    setIsLoggedIn(!!accessToken);

    // FIXME: 아래 missing dependencies warn 해결하면 checkToken 무한 실행 되는 문제가 있어 일단 로직상 꼭 필요한 것만 넣음.
  }, [accessToken]);

  return { openAuthRequiredModal, isLoggedIn, logout, getAccessToken, checkToken };
}
