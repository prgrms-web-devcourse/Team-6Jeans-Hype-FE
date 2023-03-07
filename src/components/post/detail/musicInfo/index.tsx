import styled from '@emotion/styled';

import AlbumPoster from '@/components/common/AlbumPoster';
import { COLOR } from '@/constants/color';

import { Music } from '../types';

function MusicInfo({ title, albumCoverUrl, singer }: Music) {
  return (
    <Container>
      <Title>{title}</Title>
      <Singer>{singer}</Singer>
      <AlbumPoster lazy={true} size={20} src={albumCoverUrl} />
    </Container>
  );
}

export default MusicInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6rem 0;
  color: ${COLOR.white};
`;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 4rem;
// `;

const Title = styled.div`
  max-width: 70%;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Singer = styled.div`
  max-width: 70%;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.8rem;
  margin-bottom: 2.5rem;
  text-align: center;
`;
