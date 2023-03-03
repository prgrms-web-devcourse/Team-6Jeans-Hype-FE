import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { COLOR } from '@/constants/color';

interface Props {
  shouldNeedBack?: boolean;
  backUrl?: string;
  title?: string;
  subButtonType?: 'image' | 'text';
  subButtonValue?: string;
  onClickSubButton?: any; //어떤 이벤트가 들어올지 몰라서 일단 any로 뒀음
  selectedColor?: 'white' | 'deepblue';
}

const Header: FC<Props> = ({
  shouldNeedBack = true,
  backUrl,
  title,
  subButtonType = 'text',
  subButtonValue,
  onClickSubButton,
  selectedColor = 'deepblue',
}) => {
  const router = useRouter();

  return (
    <HeaderContainer>
      {shouldNeedBack && backUrl && (
        <button onClick={() => router.push(backUrl)} style={{ cursor: 'pointer' }}>
          <img src={`/images/back-${selectedColor}-icon.svg`} style={{ width: '100%' }} />
        </button>
      )}
      {title && <H1>{title}</H1>}
      {subButtonValue && (
        <SubButton onClick={onClickSubButton}>
          {subButtonType === 'image' ? <img src={subButtonValue} alt='img' /> : <span>{subButtonValue}</span>}
        </SubButton>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: calc(100% - 4rem);
  height: 6rem;
  margin: 0 2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  align-items: center;
  position: relative;
`;

const H1 = styled.h1`
  position: absolute;
  font-size: 1.8rem;
  font-weight: bold;
  transform: translateX(-50%);
  left: 50%;
`;

const SubButton = styled.button`
  position: absolute;
  font-size: 1.5rem;
  color: ${COLOR.deepBlue};
  right: 0%;
  cursor: pointer;
`;
