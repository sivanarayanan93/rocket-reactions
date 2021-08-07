import styled from "styled-components";
import Colors from '../../../shared/colors';

type EmojiIcon = {
  isSelected?: boolean;
  bordered?: boolean;
}

const UiEmojiIcon = styled.span<EmojiIcon>`
  cursor: pointer;
  padding: 0 8px;

  ${props => {
    let {isSelected, bordered } = props;
    return bordered && `
      border: 1px solid ${isSelected ? '#0f62fe': Colors.borderColor};
      border-radius: 24px;

      ${isSelected && `background-color: #edf5ff`}
    `
  }}
`
const EmojiIcon = ({children, ...props}) => {
  return (
    <UiEmojiIcon {...props}>{children}</UiEmojiIcon>
  )
}

export default EmojiIcon;