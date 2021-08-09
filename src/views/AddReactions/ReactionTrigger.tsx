import React, {useState} from 'react'
import { TReaction, TReactions } from '../../shared/Reactions/TReactions';
import Button from '../ui/Button';
import ReactionsPoup from './ReactionsPoup';

type TReactionTrigger = {
  reactions: TReactions,
  handleOnEmojiClick: (reaction: TReaction, e?: React.MouseEvent<HTMLDivElement>) => void,
  isOpen: boolean,
  onClose: () => void,
  onTrigger: () => void
}


const ReactionTrigger = ({ isOpen, onTrigger,  onClose, reactions, handleOnEmojiClick}: TReactionTrigger) => {
  const [left, setLeft] = useState(0)
  const handleOntrigger = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    setLeft(target.offsetLeft);
    onTrigger();
  }
  return (
    <>
    <ReactionsPoup 
      left={left}
      isOpen={isOpen}
      onClose={onClose}
      reactions={reactions}
      handleOnEmojiClick={handleOnEmojiClick} 
    />
    
    <Button onClick={handleOntrigger}/>
    </>
  )
}

export default ReactionTrigger
