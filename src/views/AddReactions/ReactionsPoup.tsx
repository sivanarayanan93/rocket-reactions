import { useEffect, useState, useRef } from 'react';
import { UiReactionsPopup} from './styles';
import EmojiIcon from '../ui/EmojiIcon';
import ReactTooltip from 'react-tooltip';
import { useOutsideChecker } from '../../hooks/UseOutsideChecker';
import { TReactions } from '../../shared/Reactions/TReactions';

type TReactionsPoup = {
  reactions: TReactions,
  handleOnEmojiClick: (e: React.MouseEvent<HTMLDivElement>) => void,
  isOpen: boolean,
  onClose: () => void,
  left: number
}

const ReactionsPoup = ({ reactions, handleOnEmojiClick, isOpen, onClose, left}: TReactionsPoup) => {
  const poupRef = useRef(null),
    [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const closePopup = () => {
    setShouldShow(false);
    onClose();
  }
  
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleOnEmojiClick(e);
    onClose();
  }

  useEffect(() => {
    setShouldShow(isOpen);
  }, [isOpen])

  useOutsideChecker(poupRef, closePopup)

  return (
    <>
      {shouldShow && <UiReactionsPopup left={left} ref={poupRef} onClickCapture={handleOnClick}>
        {reactions && reactions.map((reaction) => (
          <a key={reaction.id}>
          <EmojiIcon
            data-reaction-emoji={reaction.emoji} 
            data-reaction-id={reaction.id} 
            data-for="reactions" 
            data-tip={reaction.name}>
            {reaction.emoji}
          </EmojiIcon>
          <ReactTooltip id="reactions" place="top" effect="solid"/>
          </a>
        ))}
      </UiReactionsPopup>
      }
    </>
  )
}

export default ReactionsPoup
