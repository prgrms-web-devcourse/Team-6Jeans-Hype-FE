import '../../public/fonts/font.css';

import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/lib/devtools';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import AuthRequiredModal from '@/components/login/AuthRequiredModal';
import { global } from '@/styles/global';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RecoilRoot>
        <Global styles={global} />
        <Component {...pageProps} />
        <AuthRequiredModal />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
