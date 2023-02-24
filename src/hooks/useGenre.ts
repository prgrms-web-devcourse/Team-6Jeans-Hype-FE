import { useState } from 'react';

const useGenre = () => {
  const [selectedValue, setSelectedValue] = useState<string>();
  const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  return { selectedValue, onClick };
};

export default useGenre;
