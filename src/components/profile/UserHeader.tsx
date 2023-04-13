import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import CompleteIcon from 'public/images/complete-icon.svg';
import EditIcon from 'public/images/pencil-icon.svg';
import { useRef, useState } from 'react';

import { getUserProfile, modifyUserImage, modifyUserName } from '@/components/profile/api';
import { COLOR } from '@/constants/color';
import { useToast } from '@/hooks/useToast';

import useAuth from '../auth/useAuth';
import ConfirmModal from '../common/modal/Confirm';
import SkeletonCircle from '../common/skeleton/Circle';
import Toast from '../common/Toast';
import ResultCard from './ResultCard';
import { UserInfo } from './types';

interface ResultCard {
  title: string;
  icon: string;
  isHistory?: boolean;
}

export type ResultCardType = 'ranking' | 'point' | 'history';

export const RESULT_CARD_INFO: Record<ResultCardType, ResultCard> = {
  ranking: { title: '랭킹', icon: 'images/rank.svg' },
  point: { title: '포인트', icon: 'images/point.svg' },
  history: { title: '전적', icon: 'images/history.svg', isHistory: true },
};

function UserHeader() {
  const router = useRouter();
  const { memberId } = router.query;
  const { logout } = useAuth();

  const divWrapperRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLFormElement>(null);

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>('');
  const [image, setImage] = useState<string | undefined>('');

  const { showToast, handleToast } = useToast();
  const [modalText, setModalText] = useState<string>('');

  const { data: userProfile, isLoading } = useQuery<UserInfo>(
    ['userProfile', memberId],
    () => getUserProfile(Number(memberId)),
    {
      onSuccess: (successData) => {
        setName(successData?.nickname);
        setImage(successData?.profileImageUrl);
      },
    },
  );

  const onClickLogout = () => {
    setModalStatus((prev) => !prev);
  };

  const onClickEditName = () => {
    if (divWrapperRef.current && inputWrapperRef.current) {
      divWrapperRef.current.style.display = 'none';
      inputWrapperRef.current.style.display = 'flex';
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];

    if (selectedImage) {
      const res = await modifyUserImage(selectedImage);

      if (res) {
        setImage(URL.createObjectURL(selectedImage));
        setModalText('프로필 이미지가 변경되었습니다');
      } else {
        setModalText('이미지가 너무 크거나 올바른 형태가 아닙니다');
      }
      handleToast();
    }
  };

  const onSubmitName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name) {
      const res = await modifyUserName(name);
      if (res) {
        setModalText('닉네임이 변경되었습니다');
        handleToast();
      }
      if (divWrapperRef.current && inputWrapperRef.current) {
        divWrapperRef.current.style.display = 'flex';
        inputWrapperRef.current.style.display = 'none';
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        {!memberId && <Logout onClick={onClickLogout}>로그아웃</Logout>}
        <UserContainer>
          <DefaultProfile>
            {isLoading ? (
              <SkeletonCircle width={7} height={7} />
            ) : (
              <>
                <img src={image} alt='profile' />
                {!memberId && (
                  <>
                    <ImgEditIconWrapper htmlFor='image_input'>
                      <StyledEditIcon />
                    </ImgEditIconWrapper>
                    <File type='file' id='image_input' onChange={handleImageChange} accept='image/jpeg, image/png' />
                  </>
                )}
              </>
            )}
          </DefaultProfile>
          <Info>
            <NameWrapper ref={divWrapperRef}>
              <NameDiv>{name}</NameDiv>
              {!memberId && <StyledEditIcon onClick={onClickEditName} />}
            </NameWrapper>
            <NameInputWrapper ref={inputWrapperRef} onSubmit={onSubmitName}>
              <NameInput value={name} onChange={(e) => setName(e.target.value)} maxLength={10} />
              <StyledCompleteIcon onClick={onSubmitName} />
            </NameInputWrapper>
            {userProfile?.countOfChanllenge !== undefined && (
              <RestTicket>남은 대결권 {userProfile?.countOfChanllenge}</RestTicket>
            )}
          </Info>
        </UserContainer>
        <CardContainer>
          <ResultCard type='ranking' info={userProfile?.ranking} />
          <ResultCard type='point' info={userProfile?.victoryPoint} />
          <ResultCard type='history' info={userProfile?.victoryCount} />
        </CardContainer>
      </Wrapper>
      <ConfirmModal
        isOpen={modalStatus}
        text={`로그아웃 하시겠습니까?`}
        onClickCancel={onClickLogout}
        onClickConfirm={logout}
      />
      {showToast && (
        <ToastContainer>
          <Toast message={modalText} bottom='10rem' />
        </ToastContainer>
      )}
    </Container>
  );
}

export default UserHeader;

const Container = styled.div`
  height: fit-content;
  background: linear-gradient(130.7deg, #a274dc -10.45%, #658df4 122.15%);
  padding: 2rem 0;
`;

const Wrapper = styled.div`
  margin: 0 2rem;
  position: relative;
`;

const Logout = styled.div`
  position: absolute;
  right: 0;
  color: ${COLOR.white};
  font-weight: bold;
  cursor: pointer;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 3rem 0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.4rem;
  padding: 1rem 0;
  padding-bottom: 7rem;
`;

const DefaultProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  border-radius: 50%;
  background-color: ${COLOR.white};
  & > img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
  }
`;

const ImgEditIconWrapper = styled.label`
  position: absolute;
  bottom: -1rem;
  right: -1rem;
`;

const File = styled.input`
  display: none;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: calc(100% - 10rem);
  max-width: 22rem;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NameInputWrapper = styled.form`
  display: flex;
  align-items: center;
  display: none;
`;

const NameDiv = styled.div`
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 2.2rem;
  color: ${COLOR.white};
  background-color: transparent;
`;

const NameInput = styled.input`
  background-color: white;
  color: ${COLOR.deepBlue};
  border-radius: 0.8rem;
  padding-left: 0.8rem;
  width: 14rem;
`;

const StyledEditIcon = styled(EditIcon)`
  width: 1.6rem;
  height: 1.6rem;
  margin: 1rem;
  cursor: pointer;
`;

const StyledCompleteIcon = styled(CompleteIcon)`
  width: 1.6rem;
  height: 1.6rem;
  margin: 1rem;
  cursor: pointer;
`;

const RestTicket = styled.div`
  width: fit-content;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 1.3rem;
  border-radius: 5rem;
  color: ${COLOR.white};
`;

const ToastContainer = styled.div`
  position: absolute;
  z-index: 999;
`;
