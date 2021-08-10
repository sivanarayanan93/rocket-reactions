import styled from "styled-components";
import Colors from '../../../shared/colors';

type TEmojiIcon = {
  [key: string]: any
}

const UiEmojiIcon = styled.button<TEmojiIcon>`
  cursor: pointer;
  padding: 0 8px;
  border: none;
  background: #fff;
  min-width: 32px;
  font-size: 15px;
  font-weight: inherit;


  ${props => {
    let {isSelected, bordered } = props;
    return bordered && `
      border: 1px solid ${isSelected ? '#0f62fe': Colors.borderColor};
      margin-right: 8px;
      padding: 2.5px 8px;
      border-radius: 24px;

      ${isSelected && `background-color: #edf5ff`}
    `
  }}
`
const EmojiIcon = ({children, ...props}: any) => {
  return (
    <UiEmojiIcon {...props}>{children}</UiEmojiIcon>
  )
}

export default EmojiIcon;