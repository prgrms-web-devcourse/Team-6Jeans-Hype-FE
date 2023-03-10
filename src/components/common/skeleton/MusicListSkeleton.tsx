import styled from '@emotion/styled';

import Box from './Box';

const MusicListSkeleton = ({ line = 3, ...props }) => {
  return (
    <MusicListContainer {...props}>
      {Array.from(Array(line), (_, index) =>
        index !== line - 1 ? (
          <Box width='100%' height={30} key={index} style={{ margin: '5px 0' }} />
        ) : (
          <Box width='64%' height={30} key={index} style={{ margin: '5px 0' }} />
        ),
      )}
    </MusicListContainer>
  );
};

export default MusicListSkeleton;

const MusicListContainer = styled.div`
  height: 100px;
  padding: 10px;
  margin: 10px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  border-radius: 16px;
  background-color: var(--gray);
  cursor: pointer;
`;
