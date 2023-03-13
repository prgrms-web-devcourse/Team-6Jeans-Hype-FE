import { useState } from 'react';

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1200);
  };

  return { showToast, handleToast };
};
