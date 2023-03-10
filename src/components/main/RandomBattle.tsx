import styled from '@emotion/styled';
import Versus from 'public/images/no-background-logo-white.svg';

interface RandomBattleProps {
  challengedAlbumCoverImage: string;
  challengingAlbumCoverImage: string;
  className?: string;
}

export default function RandomBattle({
  challengedAlbumCoverImage,
  challengingAlbumCoverImage,
  className,
}: RandomBattleProps) {
  return (
    <Container className={className}>
      <AlbumCoverImage src={challengedAlbumCoverImage} />
      <AlbumCoverImage src={challengingAlbumCoverImage} />
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
