import EmojiIcon from '../ui/EmojiIcon';
import ReactionsPickerTriggerPopup from './ReactionsPickerTriggerPopup';
import { UiReactionsPickerTrigger } from '../style';
import { useRef, useState } from 'react';
import useOutsideChecker from '../../../hooks/UseOutsideChecker';

const ReactionsPickerTrigger = ({onSelect, reactions}: any) => {
  const [showPickerItems, setShowPickerItems] = useState(false),
    targetRef = useRef(null);

  const handleOnClose = () => {
    setShowPickerItems(false)
  }

  const handleOnEmojiClick = () => {
    setShowPickerItems(true)
  }


  useOutsideChecker(targetRef, handleOnClose);


  return (
    <UiReactionsPickerTrigger ref={targetRef}>
      {showPickerItems && <ReactionsPickerTriggerPopup onClose={handleOnClose} onSelect={onSelect} reactions={reactions} />}
      <EmojiIcon onSelect={handleOnEmojiClick} variant="rounded">R</EmojiIcon>
    </UiReactionsPickerTrigger>
  )
}

export default ReactionsPickerTrigger;
