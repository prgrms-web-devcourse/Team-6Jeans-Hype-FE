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
    background-color: #e2e2e2;
    margin: 0 auto;
    height: 100%;
  }

  #__next,
  #root {
    width: 100%;
    height: 100%;
  }
`;
