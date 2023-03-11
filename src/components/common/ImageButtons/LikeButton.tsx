import styled from '@emotion/styled';
import LikeOffIcon from 'public/images/like-icon-off.svg';
import LikeOnIcon from 'public/images/like-icon-on.svg';

import useAuth from '@/components/login/useAuth';
import { COLOR } from '@/constants/color';
import useLike from '@/hooks/useLike';

interface Props {
  size: number;
  color: 'white' | 'purple';
  initCount: number;
  isClicked: boolean;
  onClick?(): void;
}

function Like({ size, color, initCount, isClicked, onClick }: Props) {
  const { state, onClickLike } = useLike({ initCount, isClicked });
  const { isLoggedIn, openAuthRequiredModal } = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      openAuthRequiredModal();
      return;
    }

    onClick && onClickLike();
    onClick?.();
  };

  return (
    <LikeContainer onClick={handleClick}>
      {state.isClicked ? (
        <StyledLikeOnIcon size={size} color={color} />
      ) : (
        <StyledLikeOffIcon size={size} color={color} />
      )}
      <Text color={color}>{state.count}</Text>
    </LikeContainer>
  );
}

export default Like;

interface StyleProp {
  size?: number;
  color?: 'white' | 'purple';
}

const LikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.div`
  text-align: center;
  color: ${({ color }: StyleProp) => (color === 'white' ? COLOR.white : COLOR.purple)};
  font-size: 1rem;
  padding-top: 0.3rem;
`;

const StyledLikeOnIcon = styled(LikeOnIcon)<{ color: string; size: number }>`
  width: ${(props) => `${props.size}rem`};
  height: ${(props) => `${props.size}rem`};
  fill: ${(props) => (props.color === 'purple' ? COLOR.purple : COLOR.white)};
`;

const StyledLikeOffIcon = styled(LikeOffIcon)<{ color: string; size: number }>`
  width: ${(props) => `${props.size}rem`};
  height: ${(props) => `${props.size}rem`};
  fill: ${(props) => (props.color === 'purple' ? COLOR.purple : COLOR.white)};
`;
