import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import ConfirmModal from '@/components/common/modal/Confirm';

import { isOpenedAuthRequiredModalAtom } from './store';

export default function AuthRequiredModal() {
  const [isOpen, setIsOpen] = useRecoilState(isOpenedAuthRequiredModalAtom);
  const router = useRouter();

  const onClickConfirm = () => {
    setIsOpen(false);
    router.push('/login');
  };

  const onClickCancel = () => {
    setIsOpen(false);
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClickConfirm={onClickConfirm}
      onClickCancel={onClickCancel}
      text={`로그인이 필요한 기능입니다.\n로그인 하시겠습니까?`}
    />
  );
}
