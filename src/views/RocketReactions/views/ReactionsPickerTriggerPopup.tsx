import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { UiReactionsPickerTriggerPopup } from '../style'
import EmojiIcon from '../ui/EmojiIcon'

const ReactionsPickerTriggerPopup = ({reactions, onSelect, onClose}: any) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const handleOnSelect = (reaction: any) => {
    onSelect && onSelect(reaction);
    onClose && onClose();
  }

  return (
    <UiReactionsPickerTriggerPopup>
      {reactions && reactions.map((reaction: any) => (
        <span key={reaction.id}>
          <EmojiIcon data-for="reactions" data-tip={reaction.name} key={reaction.name} reaction={reaction} onSelect={handleOnSelect}>
            {reaction.emoji}
          </EmojiIcon>
          <ReactTooltip className="react-tooltip" id="reactions" place="top" effect="solid"/>
        </span>
      ))}
    </UiReactionsPickerTriggerPopup>
  )
}

export default ReactionsPickerTriggerPopup;
