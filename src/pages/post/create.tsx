import Header from '@/components/common/Header';
import PostCreate from '@/components/post/create/index';
import usePostCreate from '@/hooks/useCreatePost';

function Create() {
  const { values, onChangeValues, onChangeMusicInfo, onSubmit } = usePostCreate();

  return (
    <>
      <Header title='추천 글쓰기' subButtonValue='완료' onClickSubButton={onSubmit} />
      <PostCreate
        values={values}
        onChangeValues={onChangeValues}
        onChangeMusicInfo={onChangeMusicInfo}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default Create;
