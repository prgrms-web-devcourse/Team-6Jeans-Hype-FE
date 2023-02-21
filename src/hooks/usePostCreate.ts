import { selectedMusicInfo, ValuesType } from '@/components/post/create/types';
import { useState } from 'react';

const usePostCreate = () => {
  const [values, setValues] = useState<ValuesType>({
    musicInfo: '',
    description: '',
    battleAvailability: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target) {
      const { value, name } = e.target;
      setValues({ ...values, [name]: value });
    } else {
      setValues({ ...values, battleAvailability: !values.battleAvailability });
    }
  };

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
