import React, {useState} from 'react'
import { TReaction, TReactions } from '../../shared/Reactions/TReactions';
import Button from '../ui/Button';
import ReactionsPoup from './ReactionsPoup';

type TReactionTrigger = {
  reactions: TReactions,
  handleOnEmojiClick: (reaction: TReaction, e?: React.MouseEvent<HTMLDivElement>) => void,
  isOpen: boolean,
  onClose: () => void,
  onTrigger: () => void,
  children?: React.ReactNode
}


const ReactionTrigger = ({ isOpen, onTrigger,  onClose, reactions, handleOnEmojiClick, children, ...props}: TReactionTrigger) => {
  const [left, setLeft] = useState(0)
  const handleOntrigger = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    setLeft(target.offsetLeft);
    onTrigger();
  }
  return (
    <div {...props}>
      <Button 
        aria-haspopup="true"
        aria-expanded="false"
        data-toggle="dropdown"
        onClick={handleOntrigger} style ={{ fontWeight: '600'}}>
          {children}
      </Button>
      <ReactionsPoup 
        left={left}
        isOpen={isOpen}
        onClose={onClose}
        reactions={reactions}
        handleOnEmojiClick={handleOnEmojiClick} 
      />
    </div>
  )
}

export default ReactionTrigger
