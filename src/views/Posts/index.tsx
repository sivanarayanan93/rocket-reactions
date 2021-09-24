
import { TPosts } from '../../shared/Posts/TPosts';
import Post from './Post';
import { useEffect, useState } from 'react';
import { getReactionsForPost } from '../../shared/Posts/PostModel';


const Posts = ({ contents, showReactions }: { contents : TPosts, showReactions?: boolean}) => {
  const  [reactions, setReactions] = useState([]);

  useEffect(() => {
    if (showReactions) {
      getReactionsForPost().then((availReactios) => {
        if(availReactios.length) {
          setReactions(availReactios);
        }
      })
    }
  }, [showReactions])

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
