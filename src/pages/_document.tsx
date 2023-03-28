import { Head, Html, Main, NextScript } from 'next/document';

import GoogleTagManagerNoscript from '@/utils/googleTagManager/Noscript';

export default function Document() {
  return (
    <Html lang='ko'>
      <title>h-y-p-e ♫•¨✧•.¸¸♪✧</title>

      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no' />
        <meta name='theme-color' content='#fbfbff' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#fbfbff' />

        <meta name='description' content="What's your Hype Music? 너만의 노래를 찾아봐!" />
        <meta property='og:url' content='https://h-y-p-e.netlify.app' />
        <meta property='og:image' content='/images/og-image.svg' />
        <meta property='og:title' content='h-y-p-e ♫•¨✧•.¸¸♪✧' />
        <meta property='og:description' content="What's your Hype Music? 너만의 노래를 찾아봐!" />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='h-y-p-e ♫•¨✧•.¸¸♪✧' />
        <meta name='twitter:description' content="What's your Hype Music? 너만의 노래를 찾아봐!" />
      </Head>
      <body>
        <GoogleTagManagerNoscript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
