
import { TPosts } from '../../shared/Posts/TPosts';
import { useSelector } from 'react-redux';
import { TReducers } from '../../reducers';
import Post from './Post';


const Posts = ({ contents }: { contents : TPosts}) => {
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
