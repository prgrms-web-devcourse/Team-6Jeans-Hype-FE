import { isServerSide } from '@/utils';
const ACCESS_TOKEN_KEY = 'serviceAccessToken';

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
