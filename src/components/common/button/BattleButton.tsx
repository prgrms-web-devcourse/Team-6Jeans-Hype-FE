import styled from '@emotion/styled';
import FireIcon from 'public/images/fire-icon.svg';

import useAuth from '@/components/auth/useAuth';
import { COLOR } from '@/constants/color';

interface Props {
  size: number;
  color: 'white' | 'blue';
  battleAbility: boolean;
  onClick?(): void;
}

function Battle({ size, color, battleAbility, onClick }: Props) {
  const { isLoggedIn, openAuthRequiredModal } = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      openAuthRequiredModal();
      return;
    }

    onClick?.();
  };

  return (
    <Container onClick={handleClick}>
      <StyledFireIcon size={size} color={color} ability={battleAbility.toString()} />
      <Text ability={battleAbility} color={color}>
        {battleAbility ? '대결신청' : '대결불가'}
      </Text>
    </Container>
  );
}

export default Battle;

interface StyleProp {
  size?: number;
  color?: string;
  ability: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.span`
  text-align: center;
  font-weight: 500;
  color: ${({ ability, color }: StyleProp) => {
    const targetColor = color === 'white' ? COLOR.white : COLOR.blue;

    return ability ? targetColor : COLOR.gray;
  }};
  padding-top: 0.3rem;
`;

const StyledFireIcon = styled(FireIcon)<{ color: string; size: number; ability: string }>`
  width: ${(props) => `${props.size}rem`};
  height: ${(props) => `${props.size * 1.3}rem`};
  stroke: ${(props) => {
    const targetColor = props.color === 'white' ? COLOR.white : COLOR.blue;

    return props.ability === 'true' ? targetColor : COLOR.gray;
  }};
`;
