import PostCreate from '@/components/postCreate/index';
import usePostCreate from '@/hooks/usePostCreate';

function Create() {
  const { values, onChange, onClickMusic, onSubmit } = usePostCreate();

  return <PostCreate values={values} onChange={onChange} onClickMusic={onClickMusic} onSubmit={onSubmit} />;
}

export default Create;
