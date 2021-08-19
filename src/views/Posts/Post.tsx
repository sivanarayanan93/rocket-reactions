import styled from 'styled-components';
import { TPost } from '../../shared/Posts/TPosts';
import { TReactions } from '../../shared/Reactions/TReactions';
import COLORS from '../../shared/colors';
import ReactionsPicker from '../RocketReactions/views/ReactionsPicker';
import { addReaction, deleteReaction, getReactionsByPost } from '../../shared/Reactions/ReactionsApi';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TReducers } from '../../reducers';
import { getUpdatedReactions } from '../../shared/Reactions/ReactionsModel';

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

  const [reactionsSummary, setReactionsSummary ] = useState<any[]>([]),
    currentUser = useSelector<TReducers, TReducers["User"]["currentUser"]>(state => state.User.currentUser);


  useEffect(() => {    
    getReactionsByPost(post.id).then((res) => {
      successSelectedReactionsCallback(res as TReactions);
    })
  }, [post]);

  const onSelectReaction = (reaction: any) => {

    const currentReaction = reactionsSummary.find((item: any) => item.id === reaction.id);
    let isReactedByCurrentUser = false;

    if (currentReaction && currentReaction.users) {
      let index = currentReaction.users.findIndex((item: any) => item.id === currentUser.id);
      
      isReactedByCurrentUser = index >= 0;
    }

    if(isReactedByCurrentUser) {
      removeReaction({id: currentReaction.id, emoji: currentReaction.emoji, contentReactionId: currentReaction.contentReactionId})
    } else {
      const postData = {id: currentReaction.id, emoji: currentReaction.emoji, contentId: post.id, userId: currentUser.id};
      postReaction(postData)
    }    
  }

  const removeReaction = (data: any) => {
    const {id, emoji, contentReactionId} = data;

    deleteReaction(contentReactionId).then((res) => {
      const payload = {id, emoji, contentReactionId};

      successReactionCallback(payload);
    });
  }

  const postReaction = (data: any) => {
    const {id, emoji, contentId, userId } = data;

    addReaction({id, contentId, userId}).then((res) => {
      const contentReactionId = res.data.id,
        payload = {id, emoji, contentReactionId};

        successReactionCallback(payload, true);
    })
  }

  const successReactionCallback = (payload: any, shouldAddRection = false) => {
    const updatedReactions = getUpdatedReactions(reactionsSummary, payload, shouldAddRection);
    
    setReactionsSummary(updatedReactions);
  }

  const successSelectedReactionsCallback = (response: TReactions) => {
    setReactionsSummary(prevState => [
      ...prevState,
      ...response
    ]);
  } 

  return (
    <PostWrapper>
        <Content>{ post.content } - {post.id}</Content> 
        {/* <ReactionsPicker summary={reactionsSummary} user={currentUser} onSelect={onSelectReaction} reactions={reactions}/> */}
        <ReactionsPicker summary={reactionsSummary} onSelect={onSelectReaction} reactions={reactions}/>
    </PostWrapper>
  )
}

export default Post;
