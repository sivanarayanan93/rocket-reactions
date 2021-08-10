import styled from "styled-components";
import COLORS from '../../../shared/colors';


const { LIGHT_GRAY, WHITE, PRIMARY_BLUE } = COLORS;

type TEmojiIcon = {
  isSelected?: boolean,
  bordered?: boolean
}

export const UiEmojiIcon = styled.button<TEmojiIcon>`
  cursor: pointer;
  padding: 0 8px;
  border: none;
  background: ${WHITE};
  min-width: 32px;
  font-size: 15px;
  font-weight: inherit;


  ${props => {
    let {isSelected, bordered } = props;
    return bordered && `
      border: 1px solid ${isSelected ? PRIMARY_BLUE : LIGHT_GRAY};
      margin-right: 8px;
      padding: 2.5px 8px;
      border-radius: 24px;

      ${isSelected && `background-color: #edf5ff`}
    `
  }}
`