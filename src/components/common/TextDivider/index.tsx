import styled from '@emotion/styled';

interface Props {
  text1: string;
  text2: string;
}

function TextDivider({ text1, text2 }: Props) {
  return (
    <TextDividerContainer>
      <span>{text1}</span> <Dot>·</Dot> <span>{text2}</span>
    </TextDividerContainer>
  );
}

export default TextDivider;

const TextDividerContainer = styled.div`
  display: flex;
  align-items: center;
  & > span:first-of-type {
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.4rem;
  }

  & > span:last-of-type {
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1.2rem;
    color: #afafaf;
  }
`;

const Dot = styled.span`
  font-size: 2rem;
  padding: 0 0.6rem;
  color: #afafaf;
`;
