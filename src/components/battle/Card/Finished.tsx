import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

import { FinishedBattleMusic } from '../List_tmp/types';
import { AlbumPoster, Container, Music, Singer, StyledVersus, Title } from './style';

interface FinishedCardProps {
  challenged: FinishedBattleMusic;
  challenging: FinishedBattleMusic;
  onClick: () => void;
}

export default function FinishedBattleCard({ challenged, challenging, onClick }: FinishedCardProps) {
  return (
    <Container onClick={onClick}>
      <Music>
        <StyledAlumPoster src={challenged.albumCoverImage} isWin={challenged.isWin} alt='album-cover' />
        <StyledTitle isWin={challenged.isWin}>{challenged.title}</StyledTitle>
        <StyledSinger isWin={challenged.isWin}>{challenged.singer}</StyledSinger>
      </Music>
      <StyledVersus />
      <Music>
        <StyledAlumPoster src={challenging.albumCoverImage} isWin={challenging.isWin} alt='album-cover' />
        <StyledTitle isWin={challenging.isWin}>{challenging.title}</StyledTitle>
        <StyledSinger isWin={challenging.isWin}>{challenging.singer}</StyledSinger>
      </Music>
    </Container>
  );
}

const StyledAlumPoster = styled(AlbumPoster)<{ isWin: boolean }>`
  ${({ isWin }) => !isWin && 'filter: grayscale();'}
`;

const StyledTitle = styled(Title)<{ isWin: boolean }>`
  ${({ isWin }) => !isWin && `color: ${COLOR.lightGray};`}
`;

const StyledSinger = styled(Singer)<{ isWin: boolean }>`
  ${({ isWin }) => !isWin && `color: ${COLOR.lightGray};`}
`;
