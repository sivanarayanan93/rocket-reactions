import React, { useState, useEffect } from 'react'
import { UiAddReaction } from './styles';
import SummaryReactions from '../SummaryReactions';
import SelectedReactions from './SelectedReactions';
import { useSelector } from 'react-redux';
import { addReaction, getReactionsByPost, removeReaction } from '../../shared/Reactions/ReactionsApi';
import { TReducers } from '../../reducers';
import ReactionTrigger from './ReactionTrigger';
import { getUpdatedReactions } from '../../shared/Reactions/ReactionsModel';
import { TReactions } from '../../shared/Reactions/TReactions';
import { TUser } from '../../shared/Users/TUsers';
import { TStringOrNumber } from '../../shared/common/TCommon';

type TAddReactions = {
  postId: TStringOrNumber,
  reactions: TReactions
}

const AddReactions = ({ postId, reactions }: TAddReactions) => {
  const currentUser = useSelector<TReducers>(state => state.User.currentUser) as TUser,
    [showReactions, setShowReactions] = useState(false),
    [showSummary, setShowSummary] = useState(false),
    [activeTab, setActiveTab] = useState<TStringOrNumber>('ALL'),
    [selectedReactions, setSelectedReactions] = useState<TReactions>([]),
    [summaryElePosition, setSummaryElePosition] = useState<number | null>(null);

  
  useEffect(() => {
    if (reactions.length) {
      getReactionsByPost(postId).then((res) => {
        const response = res as TReactions;

        setSelectedReactions([
          ...selectedReactions,
          ...response
        ]);
      })
    }
  }, [reactions, postId]);
  

  const handleOnEmojiClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement,
      reactionName = target.getAttribute('data-reaction-emoji') as string,
      reactionId = parseInt(target.getAttribute('data-reaction-id') as string);

    if(!reactionId) {
      return;
    }

    const selectedReaction = selectedReactions.find(reaction => reaction.id === reactionId);

    
    if(selectedReaction && selectedReaction.isReactedByCurrentUser) {
      const postData = {id: reactionId, emoji: reactionName, contentReactionId: selectedReaction.contentReactionId};
      deleteReaction(postData);
    } else {
      const postData = {id: reactionId, emoji: reactionName, contentId: postId, userId: currentUser.id};
      postReaction(postData);      
    }
  }

  const postReaction = (data: any) => {
    const {id, emoji, contentId, userId } = data;

    addReaction({id, contentId, userId}).then((res) => {
      const contentReactionId = res.data.id,
        payload = {id, emoji, contentReactionId};

        successReactionCallback(payload, true);
    })
  }

  const deleteReaction = (data: any) => {
    const {id, emoji, contentReactionId} = data;

    removeReaction(contentReactionId).then((res) => {
      const payload = {id, emoji, contentReactionId};

      successReactionCallback(payload);
    });
  }

  const successReactionCallback = (payload: any, shouldAddRection = false) => {
    const updatedReactions = getUpdatedReactions(selectedReactions, payload, shouldAddRection);
    
    setSelectedReactions(updatedReactions);
  }

  const handleOnEmojiHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement,
      reactionId = target && target.getAttribute('data-reaction-id');

    if(reactionId) {
      setSummaryElePosition(target.offsetLeft);
      setActiveTab(reactionId);
      // setShowSummary(true);
    }
  }

  const handleOnEmojiMouseDown = () => {
    setShowSummary(false);
  }

  return (
    <UiAddReaction>
       <SummaryReactions 
        shouldShow={showSummary}
        onClose={handleOnEmojiMouseDown}
        position={summaryElePosition}
        tabList={selectedReactions}
        activeTab={activeTab} postId={postId}/>

      <SelectedReactions
        reactions={selectedReactions}
        handleOnEmojiHover={handleOnEmojiHover}
        handleOnEmojiClick={handleOnEmojiClick}
        handleOnEmojiMouseDown={handleOnEmojiMouseDown}
      />

      <ReactionTrigger 
        isOpen={showReactions}
        onClose={() => setShowReactions(false)}
        onTrigger={() => setShowReactions(true)}
        reactions={reactions} 
        handleOnEmojiClick={handleOnEmojiClick} 
      />  
    </UiAddReaction>
  )
}

export default AddReactions
