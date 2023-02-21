import { selectedMusicInfo, ValuesType } from '@/components/post/create/types';
import { useCallback, useState } from 'react';

const usePostCreate = () => {
  const [values, setValues] = useState<ValuesType>({
    musicInfo: '',
    description: '',
    battleAvailability: false,
  });

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, name } = e.target;
      if (name === 'battleAvailability') {
        setValues({ ...values, battleAvailability: !values.battleAvailability });
      } else {
        setValues({ ...values, [name]: value });
      }
    },
    [values.description, values.battleAvailability],
  );

  const onChangeMusicInfo = (infos: selectedMusicInfo) => {
    setValues({ ...values, musicInfo: infos });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return { values, onChange, onChangeMusicInfo, onSubmit };
};

export default usePostCreate;
