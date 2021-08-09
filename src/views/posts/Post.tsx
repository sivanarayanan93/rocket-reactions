import styled from 'styled-components';
import AddReactions from '../AddReactions';
import { Post as TPost } from '../../shared/types/Posts';
import { TReactions } from '../../shared/Reactions/TReactions';

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

const Post = ({ post, reactions }: { post: TPost, reactions: TReactions}) => {
  return (
    <PostWrapper>
        <Content>{ post.content } - {post.id}</Content> 
        <AddReactions reactions={reactions} postId={post.id}/>
    </PostWrapper>
  )
}

export default Post;
