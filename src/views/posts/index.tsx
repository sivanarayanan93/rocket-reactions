import Post from './Post';
import { Post as TPost } from '../../shared/types/Posts';
import { useSelector } from 'react-redux';
import { TReducers } from '../../reducers';


const Posts = ({ contents }: { contents : TPost[]}) => {
  const reactions = useSelector<TReducers, TReducers["User"]["reactions"]>(state => state.User.reactions);

  return (
    <>
      <h2>Posts</h2>
      {contents && contents.map((content) => (
        <Post reactions={reactions} key={content.id} post={content}/>
      ))}
    </>
  )
}

export default Posts
