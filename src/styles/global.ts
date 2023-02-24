import { css } from '@emotion/react';
import reset from './reset';

export const global = css`
  ${reset}

  html {
    font-size: 62.5%;
  }

  html,
  body {
    max-width: 768px;
    margin: 0 auto;
    height: 100%;
  }

  #__next,
  #root {
    width: 100%;
    height: 100%;
    background-color: #fbfbff;
  }
`;
