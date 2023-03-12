import styled from '@emotion/styled';

import MusicPlayButton from '@/components/common/MusicPlayButton';
import { COLOR } from '@/constants/color';

export const Container = styled.div`
  position: relative;
  width: 15.7rem;
  min-height: 22.4rem;
`;

export const Card = styled.div`
  position: absolute;
  top: 4.1rem;
  left: 0;
  background: ${COLOR.white};
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  border-radius: 10px;
  width: 100%;
  min-height: calc(100% - 4.1rem);
  padding: 1.5rem;
  box-sizing: border-box;
  height: fit-content;
`;

export const Thumbnail = styled.div<{ src: string; clickSide?: 'left' | 'right' }>`
  background-image: url(${(props) => props.src});
  background-color: ${COLOR.white};
  background-repeat: no-repeat;
  background-position: center center;
  filter: drop-shadow(0 0 1.5rem rgba(158, 158, 158, 0.25));
  border-radius: 1rem;
  width: 10.5rem;
  height: 10.5rem;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.7rem;
  text-align: center;
  color: ${COLOR.deepBlue};
  margin-top: 7.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Singer = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.6rem;
  text-align: center;
  color: ${COLOR.gray};
  margin-top: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const StyledMusicPlayButton = styled(MusicPlayButton)`
  position: absolute;
  top: 3.25rem;
  left: 50%;
  transform: translateX(-50%);
`;
