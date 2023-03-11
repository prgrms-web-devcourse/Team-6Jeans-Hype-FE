import styled from '@emotion/styled';
import Versus from 'public/images/no-background-logo-white.svg';

interface RandomBattleProps {
  battle: RandomBattleAlbumCoverImage;
  onClick?: () => void;
  className?: string;
}

export interface RandomBattleAlbumCoverImage {
  battleId: number;
  challengedAlbumCoverImage: string;
  challengingAlbumCoverImage: string;
}

export default function RandomBattle({ battle, onClick, className }: RandomBattleProps) {
  return (
    <Container onClick={onClick} className={className}>
      <AlbumCoverImage src={battle.challengedAlbumCoverImage} />
      <AlbumCoverImage src={battle.challengingAlbumCoverImage} />
      <StyledVersus />
    </Container>
  );
}

const Container = styled.div`
  background: linear-gradient(98.38deg, #a274dc -1.83%, #658df4 86.44%);
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 0 1.5rem rgba(158, 158, 158, 0.25);
  padding: 2rem;
  box-sizing: border-box;
`;

const AlbumCoverImage = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 1rem;
`;

const StyledVersus = styled(Versus)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
