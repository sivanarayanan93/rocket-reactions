import styled from "styled-components";
import COLORS from "../../../../shared/colors";


const { LIGHT_GRAY, WHITE, PRIMARY_BLUE } = COLORS;

type TEmojiIcon = {
  isSelected?: boolean,
  bordered?: boolean,
  variant?: string
}

const DEFAULT = `
  padding: 0 8px;
  border: none;
  background: ${WHITE};
  min-width: 32px;
  font-size: 15px;
  font-weight: inherit;
`

const BORDERED = `
  border: 1px solid ${LIGHT_GRAY};
  margin-right: 8px;
  padding: 2.5px 8px;
  border-radius: 24px;`
;

const ROUNDED = `
  width: 32px;
  height:32px;
  border-radius: 50%;
  border: 1px solid ${LIGHT_GRAY};
  background: ${WHITE};
`

export const UiEmojiIcon = styled.button<TEmojiIcon>`
  
  cursor: pointer;

  ${DEFAULT}

  ${props => {
    let { variant, isSelected } = props;

    if (variant === 'rounded') {
      return ROUNDED;
    } else if(variant === 'bordered') {
      return isSelected ? `${BORDERED}; border: 1px solid ${PRIMARY_BLUE};` : BORDERED ;
    }
  }}
`

