import { useEffect, useState } from 'react';

interface Props {
  title: string;
  musicData: any; // 모달에서 처리할 데이터가 다를 수 있으므로 일단 any로 지정
  openStatus: boolean;
  onClickConfirm: (musicData: any) => void;
  onClickCancel: () => void;
}

const ConfirmModal = ({ title, musicData, openStatus, onClickConfirm, onClickCancel }: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  const onClickConfirmButton = () => {
    onClickConfirm(musicData);
    setIsOpened(false);
  };

  const onClickCancelButton = () => {
    onClickCancel();
    setIsOpened(false);
  };

  useEffect(() => {
    openStatus && setIsOpened(true);
  }, [openStatus]);

  return (
    <>
      {isOpened && (
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'wheat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: '0 auto',
          }}
        >
          <div>{title}</div>

          <button onClick={onClickConfirmButton}>예</button>
          <button onClick={onClickCancelButton}>취소</button>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
