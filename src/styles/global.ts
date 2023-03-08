import { css } from '@emotion/react';

import { COLOR } from '@/constants/color';

import reset from './reset';

export const global = css`
  ${reset}

  html {
    font-size: 62.5%;
  }

  html,
  body {
    max-width: 768px;
    min-width: 350px;
    margin: 0 auto;
    height: 100%;
  }

  #__next,
  #root {
    width: 100%;
    min-height: 100%;
    background-color: ${COLOR.background};
    color: ${COLOR.deepBlue};
  }

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
`;
