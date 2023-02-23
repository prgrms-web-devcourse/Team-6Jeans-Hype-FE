import { css } from '@emotion/react';
import reset from './reset';

export const global = css`
  ${reset}

  html,
  body {
    max-width: 768px;
    background-color: #e2e2e2;
    margin: 0 auto;
  }
`;
