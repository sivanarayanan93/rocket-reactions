import styled from 'styled-components';
import AddReactions from '../AddReactions';
import { TPost } from '../../shared/Posts/TPosts';
import { TReactions } from '../../shared/Reactions/TReactions';
import COLORS from '../../shared/colors';

const PostWrapper = styled.div`
  background-color: ${COLORS.WHITE};
  border-radius: 8px;
  padding: 14px 24px 10px 24px;
  margin: 10px 0;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 100px;
  margin-top: 10px;
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
