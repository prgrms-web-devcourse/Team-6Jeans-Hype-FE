import { isServerSide } from '@/utils/renderSide';
const ACCESS_TOKEN_KEY = 'accessToken';

export const tokenStorage = {
  get() {
    if (isServerSide()) return '';
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  set(accessToken: string) {
    if (isServerSide()) return;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },
  remove() {
    if (isServerSide()) return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
