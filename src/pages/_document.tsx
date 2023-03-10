import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <title>Hype | 하입 ♫•*¨*•.¸¸♪✧</title>

      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no' />
        <meta name='theme-color' content='#fbfbff' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#fbfbff' />

        <meta name='description' content="What's your Hype Music? 너만의 노래를 찾아봐!" />
        <meta property='og:url' content='https://h-y-p-e.netlify.app' />
        <meta property='og:image' content='/images/og-image.svg' />
        <meta property='og:title' content='Hype | 하입 ♫•*¨*•.¸¸♪✧' />
        <meta property='og:description' content="What's your Hype Music? 너만의 노래를 찾아봐!" />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Hype | 하입 ♫•*¨*•.¸¸♪✧' />
        <meta name='twitter:description' content="What's your Hype Music? 너만의 노래를 찾아봐!" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
