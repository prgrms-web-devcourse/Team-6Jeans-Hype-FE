import { BattleMusic } from '../list/types';
import { AlbumPoster, Container, Music, Singer, StyledVersus, Title } from './style';

interface BattleCardProps {
  challenged: BattleMusic;
  challenging: BattleMusic;
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
