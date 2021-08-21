import styled from 'styled-components';
import { TPost } from '../../shared/Posts/TPosts';
import { TReactions } from '../../shared/Reactions/TReactions';
import COLORS from '../../shared/colors';
import { addReaction, deleteReaction, getReactionsByPost } from '../../shared/Reactions/ReactionsApi';
import { useState, useEffect, useRef, useMemo, useContext } from 'react';
import {AppContext } from '../../App';
import { getSelelcedReactions, getUpdatedReactions } from '../../shared/Reactions/ReactionsModel';
import  RocketReactions  from '../RocketReactions';

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
    { users, currentUser } = useContext(AppContext),
    [selectedReaction, setSelectedReaction] = useState<any>({}),
    lastAddReactionPromise = useRef<any>(null),
    lastRemoveReactionPromise = useRef<any>(null);

  const memoizedReactions = useMemo(() => {
    return reactions && reactions.map(item => item.name) as any
  }, [reactions]);


  useEffect(() => {
    if (post && post.id && reactions.length) {
      getReactionsByPost(post.id).then((res: any) => {
        if (res.length) {
          successSelectedReactionsCallback(res);
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, reactions]);

  const memoizedReactionSummary = useMemo(() => {
    return reactionsSummary && reactionsSummary.map(item => ({ emoji: item.emoji, users: item.users}));
  }, [reactionsSummary])

  useEffect(() => {
    if (selectedReaction && selectedReaction.id && !selectedReaction.contentReactionId) {
      if (!lastAddReactionPromise.current) {
        const {id, contentId, userId, emoji} = selectedReaction;
        let currentPromise = addReaction({id, contentId, userId});
        lastAddReactionPromise.current = currentPromise;

        currentPromise.then((res) => {
          if (lastAddReactionPromise.current === currentPromise) {
            successReactionCallback({id, emoji, contentReactionId: res.data && res.data.id}, true);
            lastAddReactionPromise.current = null;
          }
        }).catch(() => {
          if (lastAddReactionPromise.current === currentPromise) {
            setSelectedReaction({});
            lastAddReactionPromise.current = null;
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReaction, lastAddReactionPromise.current])

  useEffect(() => {
    if (selectedReaction && selectedReaction.contentReactionId) {
      if (!lastRemoveReactionPromise.current) {
        const { id,  emoji, contentReactionId } = selectedReaction;
        let currentPromise = deleteReaction(contentReactionId);

        lastRemoveReactionPromise.current = currentPromise;

        currentPromise.then((res) => {
          if (lastRemoveReactionPromise.current === currentPromise) {
            successReactionCallback({ id,  emoji, contentReactionId });
            lastRemoveReactionPromise.current = null;
          }
        }).catch((res) => {
          if (lastRemoveReactionPromise.current === currentPromise) {
            setSelectedReaction({});
            lastRemoveReactionPromise.current = null;
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReaction, lastRemoveReactionPromise.current])

  const onSelectReaction = (emoji: any) => {

    let currentReaction = reactionsSummary.find((item: any) => item.emoji === emoji);
    
    if (!currentReaction) {
      currentReaction = reactions.find(item => String(item.name).toLowerCase() === emoji);
      currentReaction.emoji = emoji;
    }

    setSelectedReaction({...currentReaction, contentId: post.id, userId: currentUser.id})
  }

  const successReactionCallback = (payload: any, shouldAddRection = false) => {
    const updatedReactions = getUpdatedReactions(reactionsSummary, payload, shouldAddRection, currentUser);
    
    setReactionsSummary(updatedReactions);
    setSelectedReaction({});
  }

  const successSelectedReactionsCallback = (response: TReactions) => {
    const selectedReactions = getSelelcedReactions(response, {users, currentUser, reactions});
    
    setReactionsSummary(selectedReactions);
  } 

  return (
    <PostWrapper>
      <Content>{ post.content } - {post.id}</Content>
      {reactions.length > 0 && <RocketReactions summary={memoizedReactionSummary} onSelect={onSelectReaction} userId={currentUser && currentUser.id} reactions={memoizedReactions} />}
    </PostWrapper>
  )
}

export default Post;
