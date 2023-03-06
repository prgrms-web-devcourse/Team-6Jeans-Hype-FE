import styled from '@emotion/styled';

import Box from './Box';

const AlbumPosterSkeleton = ({ line = 3, ...props }) => {
  return (
    <MusicContainer {...props}>
      <AlbumContainer>
        <Box width={100} height={100} />
      </AlbumContainer>
      <BoxContainer>
        {Array.from(Array(line), (_, index) =>
          index !== line - 1 ? (
            <Box width='100%' height={10} key={index} style={{ margin: '5px 0' }} />
          ) : (
            <Box width='64%' height={10} key={index} style={{ margin: '5px 0' }} />
          ),
        )}
      </BoxContainer>
    </MusicContainer>
  );
};

export default AlbumPosterSkeleton;

const MusicContainer = styled.div`
  width: 11rem;
  height: 14rem;
  background: #ffffff;
  box-shadow: 0px 0px 1.5rem rgb(158 158 158 / 25%);
  border-radius: 1rem;
  position: relative;
  padding: 2rem;
`;

const AlbumContainer = styled.div`
  position: absolute;
  top: -3rem;
`;

const BoxContainer = styled.div`
  position: relative;
  top: 7rem;
`;
