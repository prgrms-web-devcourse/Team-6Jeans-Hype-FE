import PostCreate from '@/components/post/create/index';
import usePostCreate from '@/hooks/usePostCreate';

function Create() {
  const { values, onChangeValues, onChangeMusicInfo, onSubmit } = usePostCreate();

  return (
    <PostCreate
      values={values}
      onChangeValues={onChangeValues}
      onChangeMusicInfo={onChangeMusicInfo}
      onSubmit={onSubmit}
    />
  );
}

export default Create;
