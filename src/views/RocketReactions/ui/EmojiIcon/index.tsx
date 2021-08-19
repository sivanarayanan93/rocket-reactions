import { UiEmojiIcon } from './styles';

const EmojiIcon = ({ variant, onSelect, children, reaction, onHover, isSelected, ...props }: any) => {
  const handleOnClick = () => {
    if (onSelect) {
      onSelect(reaction);
    }
  }

  return (
    <UiEmojiIcon {...props} isSelected={isSelected} variant={variant} onMouseOver={() => onHover ? onHover(reaction.id): ''} onClick={handleOnClick}>
      {children}
    </UiEmojiIcon>
  )
}

export default EmojiIcon;