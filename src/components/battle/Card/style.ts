import styled from '@emotion/styled';
import Versus from 'public/images/no-background-logo.svg';

import { COLOR } from '@/constants/color';

export const Container = styled.div`
  background-color: ${COLOR.white};
  box-shadow: 0px 0px 10px rgba(226, 226, 226, 0.25);
  border-radius: 1rem;
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 1.6rem 1.3rem;
`;

export const StyledVersus = styled(Versus)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Music = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const AlbumPoster = styled.img`
  border-radius: 1rem;
  height: 6.5rem;
  width: 6.5rem;
  object-fit: cover;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.4rem;
  color: ${COLOR.deepBlue};
  width: 11.8rem;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

export const Singer = styled.div`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.4rem;
  color: ${COLOR.gray};
  width: 11.8rem;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;
