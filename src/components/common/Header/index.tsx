import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

interface Props {
  shouldNeedBack?: boolean;
  title?: string;
  subButtonType?: 'image' | 'text';
  subButtonValue?: string;
  onClickSubButton?: any; //어떤 이벤트가 들어올지 몰라서 일단 any로 뒀음
  selectedColor?: 'white' | 'deepblue';
}

const Header = ({
  shouldNeedBack = true,
  title,
  subButtonType = 'text',
  subButtonValue,
  onClickSubButton,
  selectedColor = 'deepblue',
}: Props) => {
  return (
    <HeaderContainer>
      {shouldNeedBack && (
        <button onClick={() => history.back()}>
          <img
            src={selectedColor === 'deepblue' ? '/images/back-deepblue-icon.svg' : '/images/back-white-icon.svg'}
            style={{ width: '100%' }}
          />
        </button>
      )}
      {title && <H1>{title}</H1>}
      {subButtonValue && (
        <SubButton onClick={onClickSubButton}>
          {subButtonType === 'image' ? <img src={subButtonValue} /> : <span>{subButtonValue}</span>}
        </SubButton>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 6rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  align-items: center;
  position: relative;

  & > h1 {
  }
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
