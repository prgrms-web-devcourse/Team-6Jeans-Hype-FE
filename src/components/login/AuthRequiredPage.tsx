import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { accessTokenAtom } from './store';

interface AuthRequiredPageProps {
  children: ReactNode;
}

export default function AuthRequiredPage({ children }: AuthRequiredPageProps) {
  const accessToken = useRecoilValue(accessTokenAtom);
  const router = useRouter();

  useEffect(() => {
    if (accessToken === null) {
      router.replace('/');
    }
  }, [router, router.isReady, accessToken]);

  return <>{children}</>;
}
