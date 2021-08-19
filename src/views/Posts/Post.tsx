import styled from 'styled-components';
import { TPost } from '../../shared/Posts/TPosts';
import { TReactions } from '../../shared/Reactions/TReactions';
import COLORS from '../../shared/colors';
import ReactionsPicker from '../RocketReactions/views/ReactionsPicker';
import { addReaction, deleteReaction, getReactionsByPost } from '../../shared/Reactions/ReactionsApi';
import { useState, useEffect, useRef } from 'react';
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

const initPromise = {
  promise: null
}

const Post = ({ post, reactions }: { post: TPost, reactions: TReactions}) => {

  const [reactionsSummary, setReactionsSummary ] = useState<any[]>([]),
    currentUser = useSelector<TReducers, TReducers["User"]["currentUser"]>(state => state.User.currentUser),
    [selectedReaction, setSelectedReaction] = useState<any>({}),
    lastAddReactionPromise = useRef({...initPromise}),
    lastRemoveReactionPromise = useRef({...initPromise});


  useEffect(() => {
    if (post && post.id) {
      getReactionsByPost(post.id).then((res) => {
        successSelectedReactionsCallback(res as TReactions);
      })
    }    
  }, [post]);

  useEffect(() => {
    if (selectedReaction && selectedReaction.id && !selectedReaction.contentReactionId) {
      if (!lastAddReactionPromise.current.promise) {
        const {id, contentId, userId, emoji} = selectedReaction;
        let currentPromise = addReaction({id, contentId, userId});
        lastAddReactionPromise.current.promise = currentPromise;

        currentPromise.then((res) => {
          if (lastAddReactionPromise.current.promise === currentPromise) {
            successReactionCallback({id, emoji, contentReactionId: res.data.id}, true);
            lastAddReactionPromise.current = {...initPromise};
          }
        }).catch(() => {
          if (lastAddReactionPromise.current.promise === currentPromise) {
            setSelectedReaction({});
            lastAddReactionPromise.current = { ...initPromise };
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReaction, lastAddReactionPromise.current.promise])

  useEffect(() => {
    if (selectedReaction && selectedReaction.contentReactionId) {
      if (!lastRemoveReactionPromise.current.promise) {
        const { id,  emoji, contentReactionId } = selectedReaction;
        let currentPromise = deleteReaction(contentReactionId);

        lastRemoveReactionPromise.current.promise = currentPromise;

        currentPromise.then((res) => {
          if (lastRemoveReactionPromise.current.promise === currentPromise) {
            successReactionCallback({ id,  emoji, contentReactionId });
            lastRemoveReactionPromise.current = {...initPromise};
          }
        }).catch((res) => {
          if (lastRemoveReactionPromise.current.promise === currentPromise) {
            setSelectedReaction({});
            lastRemoveReactionPromise.current = { ...initPromise };
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReaction, lastRemoveReactionPromise.current.promise])

  const onSelectReaction = (reaction: any) => {

    const currentReaction = reactionsSummary.find((item: any) => item.id === reaction.id) || reaction;
    // let isReactedByCurrentUser = false;

    // if (currentReaction && currentReaction.users) {
    //   let index = currentReaction.users.findIndex((item: any) => item.id === currentUser.id);
      
    //   isReactedByCurrentUser = index >= 0;
    // }

    setSelectedReaction({...currentReaction, contentId: post.id, userId: currentUser.id})
  }

  const successReactionCallback = (payload: any, shouldAddRection = false) => {
    const updatedReactions = getUpdatedReactions(reactionsSummary, payload, shouldAddRection);
    
    setReactionsSummary(updatedReactions);
    setSelectedReaction({});
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
        <ReactionsPicker summary={reactionsSummary} user={currentUser} onSelect={onSelectReaction} reactions={reactions}/>
    </PostWrapper>
  )
}

export default Post;
