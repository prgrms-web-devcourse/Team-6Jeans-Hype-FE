import styled from '@emotion/styled';
import Versus from 'public/images/no-background-logo.svg';

import { COLOR } from '@/constants/color';

import { BattleMusic } from './list/types';

interface BattleCardProps {
  id: number;
  challenged: BattleMusic;
  challenging: BattleMusic;
  isProgress: boolean;
}

export default function BattleCard({ challenged, challenging }: BattleCardProps) {
  return (
    <Container>
      <Music>
        <AlbumPoster src={challenged.albumCoverImage} alt='album-cover' />
        <Title>{challenged.title}</Title>
        <Singer>{challenged.singer}</Singer>
      </Music>
      <StyledVersus />
      <Music>
        <AlbumPoster src={challenging.albumCoverImage} alt='album-cover' />
        <Title>{challenging.title}</Title>
        <Singer>{challenging.singer}</Singer>
      </Music>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${COLOR.white};
  box-shadow: 0px 0px 10px rgba(226, 226, 226, 0.25);
  border-radius: 1rem;
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 1.6rem 1.3rem;
`;

const Music = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const AlbumPoster = styled.img`
  border-radius: 1rem;
  height: 6.5rem;
  width: 6.5rem;
  object-fit: cover;
`;

const Title = styled.div`
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

const StyledVersus = styled(Versus)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Singer = styled.div`
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
