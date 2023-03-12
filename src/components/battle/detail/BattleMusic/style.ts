import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

export const Container = styled.div`
  max-width: 20rem;
  width: 45%;
  height: 18rem;
  background: ${COLOR.white};
  box-shadow: 0px 0px 1.5rem rgba(158, 158, 158, 0.25);
  border-radius: 1rem;
  position: relative;

  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  top: -3rem;
`;

export const Thumbnail = styled.div<{ src: string; clickSide: 'left' | 'right' | undefined }>`
  background-image: url(${(props) => props.src});
  background-color: ${COLOR.white};
  background-repeat: no-repeat;
  background-position: center center;
  filter: drop-shadow(0 0 1.5rem rgba(158, 158, 158, 0.25));
  border-radius: 1rem;
  width: 10rem;
  height: 10rem;
  position: relative;
  margin-bottom: 2rem;
`;

export const PlayIcon = styled.div<{ value: string | undefined }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(prop) => (prop.value === '' ? 'none' : 'block')};
`;

export const Title = styled.div`
  width: calc(100% - 2.5rem);
  font-style: normal;
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.7rem;
  text-align: center;
  color: ${COLOR.deepBlue};
  margin-bottom: 1rem;
  word-break: break-all;
  height: 3.7rem;
  overflow-y: auto;
`;

export const Singer = styled.div`
  width: calc(100% - 1.6rem);
  padding: 0 0.8rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.6rem;
  text-align: center;
  color: ${COLOR.gray};
`;
