import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { accessTokenAtom, isOpenedAuthRequiredModalAtom } from './store';

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setIsOpenedAuthRequiredModal = useSetRecoilState(isOpenedAuthRequiredModalAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  const openAuthRequiredModal = () => {
    setIsOpenedAuthRequiredModal(true);
  };

  const getAccessToken = () => {
    return accessToken;
  };

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  return { openAuthRequiredModal, isLoggedIn, getAccessToken };
}
