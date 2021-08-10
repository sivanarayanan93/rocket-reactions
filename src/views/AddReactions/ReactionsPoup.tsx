import { useEffect, useRef } from 'react';
import { UiReactionsPopup} from './styles';
import EmojiIcon from '../ui/EmojiIcon';
import ReactTooltip from 'react-tooltip';
import useOutsideChecker from '../../hooks/UseOutsideChecker';
import { TReaction, TReactions } from '../../shared/Reactions/TReactions';

type TReactionsPoup = {
  reactions: TReactions,
  handleOnEmojiClick: (reaction: TReaction, e?: React.MouseEvent<HTMLDivElement>) => void,
  isOpen: boolean,
  onClose: () => void,
  left: number
}

const ReactionsPoup = ({ reactions, handleOnEmojiClick, isOpen, onClose, left}: TReactionsPoup) => {
  const poupRef = useRef(null);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const closePopup = () => {
    onClose();
  }
  
  const handleOnClick = (reaction:TReaction) => {
    handleOnEmojiClick(reaction);
    onClose();
  }

  useOutsideChecker(poupRef, closePopup)

  return (
    <>
      {isOpen && <UiReactionsPopup left={left} ref={poupRef}>
        {reactions && reactions.map((reaction) => (
          <span key={reaction.id}>
            <EmojiIcon onClick={() => handleOnClick(reaction)}
              data-reaction-emoji={reaction.emoji} 
              aria-haspopup="true"
              tabIndex={0}
              data-reaction-id={reaction.id} 
              data-for="reactions" 
              data-tip={reaction.name}>
              {reaction.emoji}
            </EmojiIcon>
            <ReactTooltip className="react-tooltip" id="reactions" place="top" effect="solid"/>
          </span>
        ))}
      </UiReactionsPopup>
      }
    </>
  )
}

export default ReactionsPoup
