import styled from '@emotion/styled';
import LikeOffIcon from 'public/images/like-icon-off.svg';
import LikeOnIcon from 'public/images/like-icon-on.svg';
import { useEffect, useState } from 'react';

import useAuth from '@/components/login/useAuth';
import { changeLikeStatus } from '@/components/post/detail/api';
import { COLOR } from '@/constants/color';

interface Props {
  size: number;
  color: 'white' | 'purple';
  initCount: number;
  initIsClick: boolean;
  postId?: string;
}

function Like({ size, color, initCount, initIsClick, postId }: Props) {
  const [isClick, setIsClick] = useState(initIsClick);
  const [currentCount, setCurrentCount] = useState(initCount);

  const { isLoggedIn, openAuthRequiredModal } = useAuth();

  const updateIsLikeCount = async () => {
    if (typeof postId !== 'string') return;

    const isLike = await changeLikeStatus(postId);
    setCurrentCount((prev) => {
      return isLike ? prev + 1 : prev - 1;
    });
    setIsClick(isLike);
  };

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLoggedIn) {
      openAuthRequiredModal();
      return;
    }

    e.preventDefault();

    updateIsLikeCount();
  };

  useEffect(() => {
    setCurrentCount(initCount);
    setIsClick(initIsClick);
  }, [initCount, initIsClick]);

  return (
    <LikeContainer onClick={handleClick}>
      {isClick ? <StyledLikeOnIcon size={size} color={color} /> : <StyledLikeOffIcon size={size} color={color} />}
      <Text color={color}>{currentCount}</Text>
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
  padding-top: 0.3rem;
  font-weight: 500;
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
