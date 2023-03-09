import { useEffect, useState } from 'react';

export const useCheckMobile = () => {
  const [mobile, setMobile] = useState(false);

  const handleCheckScreen = () => {
    if (window.screen.width <= 768 || window.innerWidth <= 768) {
      setMobile(true);
      return;
    }

    setMobile(false);
  };

  useEffect(() => {
    handleCheckScreen();
    window.addEventListener('resize', handleCheckScreen);

    return () => {
      window.removeEventListener('resize', handleCheckScreen);
    };
  }, []);

  return { mobile };
};
