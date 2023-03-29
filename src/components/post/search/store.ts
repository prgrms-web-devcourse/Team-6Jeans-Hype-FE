import { atom } from 'recoil';

export const searchedKeyword = atom<string>({
  key: 'searchedKeyword',
  default: '',
});

export const searchedTempKeyword = atom<string>({
  key: 'searchedTempKeyword',
  default: '',
});
