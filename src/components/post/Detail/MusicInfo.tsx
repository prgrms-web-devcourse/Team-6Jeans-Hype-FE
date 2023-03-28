import styled from '@emotion/styled';

import AlbumPoster from '@/components/common/AlbumPoster';
import { COLOR } from '@/constants/color';

import { Music } from './types';

function MusicInfo({ title, albumCoverUrl, singer }: Music) {
  return (
    <Container>
      <AlbumPoster lazy={true} size={10} src={albumCoverUrl} />
      <Title>{title}</Title>
      <Singer>{singer}</Singer>
    </Container>
  );
}

export default MusicInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  color: ${COLOR.white};
  margin: 4rem 0;
`;

const Title = styled.div`
  max-width: 70%;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.2rem;
  text-align: center;
  margin-top: 1rem;
`;

const Singer = styled.div`
  max-width: 70%;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.8rem;
`;
