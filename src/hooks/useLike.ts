import { useState } from 'react';

interface Props {
  initCount: number;
  isClicked: boolean;
}

interface State {
  count: number;
  isClicked: boolean;
}

const useLike = ({ initCount, isClicked }: Props) => {
  const [state, setState] = useState<State>({
    count: initCount,
    isClicked: isClicked,
  });

  const onClickLike = () => {
    if (state.isClicked) {
      setState({ count: state.count - 1, isClicked: !state.isClicked });
    } else {
      setState({ count: state.count + 1, isClicked: !state.isClicked });
    }
  };

  return { state, onClickLike };
};

export default useLike;
