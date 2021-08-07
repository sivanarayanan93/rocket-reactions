import React from 'react'
import Post from './Post';
import { Post as PostType } from '../../shared/types/Posts';

type Posts = {
  contents: PostType[]
}

const Posts: React.FC<Posts> = ({ contents }) => {
  return (
    <>
      {contents && contents.map((content) => (
        <Post key={content.id} post={content}/>
      ))}
    </>
  )
}

export default Posts
