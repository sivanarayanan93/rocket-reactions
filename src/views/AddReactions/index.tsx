import React, { useState, useEffect } from 'react'
import { UiAddReaction } from './styles';
import SummaryReactions from '../SummaryReactions';
import { TReaction } from '../../shared/types/Reaction';
import SelectedReactions from './SelectedReactions';
import { useSelector } from 'react-redux';
import { addReaction, getReactionsByPost, removeReaction } from '../../shared/User/UserApi';
import { TReducers } from '../../reducers';
import { User } from '../../shared/types/User';
import ReactionTrigger from './ReactionTrigger';

type TAddReactions = {
  postId: string | number,
  reactions: TReaction[]
}

const AddReactions = ({ postId, reactions }: TAddReactions) => {
  const currentUser = useSelector<TReducers>(state => state.User.currentUser) as User,
    [showReactions, setShowReactions] = useState(false),
    [showSummary, setShowSummary] = useState(false),
    [activeTab, setActiveTab] = useState<string | number>('ALL'),
    [selectedReactions, setSelectedReactions] = useState<TReaction[]>([]),
    [summaryElePosition, setSummaryElePosition] = useState<number | null>(null);

  
  useEffect(() => {
    if (reactions.length) {
      getReactionsByPost(postId).then((res) => {
        const response = res as TReaction[];

        for(let reaction of response) {
          const index = reactions.findIndex(item => item.id === reaction.id);
    
          if(index >= 0) {
            reaction.emoji = reactions[index].emoji;
          }
        }
    
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

    const index = selectedReactions.findIndex(reaction => reaction.id === reactionId),
      selectedReaction = selectedReactions[index];

    
    if(selectedReaction && selectedReaction.isReactedByCurrentUser) {
      removeReaction(selectedReaction.contentReactionId).then((res) => {
        if (index >= 0) {
          const selectedReactionsCopy = [...selectedReactions],
            selectedReactionCopy = selectedReactionsCopy[index];

          if(selectedReactionCopy) {
            selectedReactionCopy.count = Number.isInteger(selectedReactionCopy.count) ?  selectedReactionCopy.count - 1 : 1;
            selectedReactionCopy.isReactedByCurrentUser = false;
            delete selectedReactionCopy.contentReactionId;

            setSelectedReactions(selectedReactionsCopy);
          }

        } else {
          setSelectedReactions(prevState => prevState.filter(item => item.id !== reactionId));
        }
      });
    } else {
      addReaction({id: reactionId, contentId: postId, userId: currentUser.id}).then((res) => {
        if (selectedReaction) {
          const selectedReactionsCopy = [...selectedReactions];

          selectedReactionsCopy[index].count += 1;
          selectedReactionsCopy[index].isReactedByCurrentUser = true;
          selectedReactionsCopy[index].contentReactionId = res.data.id

          setSelectedReactions(selectedReactionsCopy)
        } else {
          setSelectedReactions([
            ...selectedReactions,
            { id: reactionId,
              contentReactionId:res.data.id,
              emoji: reactionName,
              count: 1,
              isReactedByCurrentUser: true}
          ]);
        }
      })
    }
  }

  const handleOnEmojiHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement,
      reactionId = target && target.getAttribute('data-reaction-id');

    if(reactionId) {
      setSummaryElePosition(target.offsetLeft);
      setActiveTab(reactionId);
      setShowSummary(true);
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
