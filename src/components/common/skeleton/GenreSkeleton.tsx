import styled from '@emotion/styled';

import Box from './Box';

const GenreSkeleton = ({ amount = 5, ...props }) => {
  return (
    <GenreContainer {...props}>
      {Array.from(Array(amount), (_, index) => (
        <Box width='100%' height={26} key={index} style={{ margin: '0 1.6rem' }} />
      ))}
    </GenreContainer>
  );
};

export default GenreSkeleton;

const GenreContainer = styled.div`
  display: flex;
  margin-top: 4rem;
`;
