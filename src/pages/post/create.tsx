import Header from '@/components/common/Header';
import HeaderSubmitButton from '@/components/common/Header/SubmitButton';
import PostCreate from '@/components/post/create/index';
import usePostCreate from '@/hooks/useCreatePost';

function Create() {
  const { values, onChangeValues, onChangeMusicInfo, onSubmit } = usePostCreate();

  return (
    <>
      <Header
        title='추천 글쓰기'
        backUrl='/post/searchMusics'
        actionButton={<HeaderSubmitButton onClick={onSubmit} />}
      />
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
