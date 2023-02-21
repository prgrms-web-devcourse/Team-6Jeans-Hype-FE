import PostCreate from '@/components/post/create/index';
import usePostCreate from '@/hooks/usePostCreate';

function Create() {
  const { values, onChange, onSubmit } = usePostCreate();

  return <PostCreate values={values} onChange={onChange} onSubmit={onSubmit} />;
}

export default Create;
