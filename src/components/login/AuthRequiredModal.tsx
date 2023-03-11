import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import ConfirmModal from '@/components/common/Modal/Confirm';

import { isOpenedAuthRequiredModalAtom } from './store';

export default function AuthRequiredModal() {
  const [isOpened, setIsOpened] = useRecoilState(isOpenedAuthRequiredModalAtom);
  const router = useRouter();

  const onClickConfirm = () => {
    setIsOpened(false);
    router.push('/login');
  };

  const onClickCancel = () => {
    setIsOpened(false);
  };

  return (
    <ConfirmModal
      isOpened={isOpened}
      onClickConfirm={onClickConfirm}
      onClickCancel={onClickCancel}
      text={`로그인이 필요한 기능입니다.\n로그인 하시겠습니까?`}
    />
  );
}
