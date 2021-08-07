import React from 'react'
import styled from 'styled-components';
import AddReactions from '../ui/AddReactions';
import { Post as PostType } from '../../shared/types/Posts';

const PostWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  height: 300px;
  Padding: 12px;
  width: 100%;
`;

const Content = styled.div`
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 100px;
  margin: 10px 0;
`

type TPost = {
  post: PostType
}

const Post: React.FC<TPost> = ({ post }) => {
  return (
    <PostWrapper>
        <Content>{ post.content } - {post.id}</Content> 
        <AddReactions />
    </PostWrapper>
  )
}

export default Post;
