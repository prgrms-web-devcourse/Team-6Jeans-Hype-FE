import { atom } from 'recoil';

import { axiosInstance } from '@/api';
import { isClientSide } from '@/utils';

import { tokenStorage } from './utils/localStorage';

export const accessTokenAtom = atom<string | null>({
  key: 'accessToken',
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      if (isClientSide()) {
        const token = tokenStorage.get();
        if (token !== null) {
          setSelf(token);
          axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
      }

      onSet((token, _, isReset) => {
        if (isReset || token === null) {
          tokenStorage.remove();
          return;
        }
        tokenStorage.set(token);
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      });
    },
  ],
});

export const isOpenedAuthRequiredModalAtom = atom<boolean>({
  key: 'isOpenedAuthRequiredModal',
  default: false,
});

export const isCheckedTokenAtom = atom<boolean>({ key: 'isCheckedToken', default: false });
