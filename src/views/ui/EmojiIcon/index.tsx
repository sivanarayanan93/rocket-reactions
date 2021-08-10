import { UiEmojiIcon } from './styles';

const EmojiIcon = ({children, ...props}: any) => {
  return (
    <UiEmojiIcon {...props}>{children}</UiEmojiIcon>
  )
}

export default EmojiIcon;