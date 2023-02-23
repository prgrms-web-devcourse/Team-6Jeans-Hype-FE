import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = () => setState((state) => !state);

  return { state, toggle };
};

export default useToggle;
