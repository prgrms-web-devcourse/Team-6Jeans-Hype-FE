import { useCallback, useState } from 'react';

const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);

  return { state, toggle };
};

export default useToggle;
