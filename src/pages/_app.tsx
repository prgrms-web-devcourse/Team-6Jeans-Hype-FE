import '../../public/fonts/font.css';

import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import AuthRequiredModal from '@/components/auth/AuthRequiredModal';
import { global } from '@/styles/global';
import * as gtm from '@/utils/googleTagManager/gtm';
import GoogleTagManagerScript from '@/utils/googleTagManager/Script';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', gtm.pageview);
    return () => {
      router.events.off('routeChangeComplete', gtm.pageview);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleTagManagerScript />
      <ReactQueryDevtools initialIsOpen={false} />
      <RecoilRoot>
        <Global styles={global} />
        <Component {...pageProps} />
        <AuthRequiredModal />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
