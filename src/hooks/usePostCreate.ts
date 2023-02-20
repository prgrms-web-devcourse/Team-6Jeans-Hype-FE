import { TrackInfo, ValuesType } from '@/components/postCreate/types';
import { useState } from 'react';

const usePostCreate = () => {
  const [values, setValues] = useState<ValuesType>({
    musicInfo: '',
    description: '',
    battleAvailability: false,
  });

  const onChange = (e: any) => {
    if (e.target) {
      const { value, name } = e.target;
      setValues({ ...values, [name]: value });
    } else {
      setValues({ ...values, battleAvailability: !values.battleAvailability });
    }
  };

  const onClickMusic = (infos: TrackInfo) => {
    setValues({ ...values, musicInfo: infos });
  };

  const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return { values, onChange, onClickMusic, onSubmit };
};

export default usePostCreate;
