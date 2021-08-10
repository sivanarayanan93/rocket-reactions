import styled from 'styled-components';
import COLORS from '../../shared/colors';

type TUiReactionsPopup = {
  left: number
};

export const UiAddReaction = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  padding: 10px 0;

  .added-reactions {
    line-height: 40px;
  }
`

export const UiReactionsPopup = styled.div<TUiReactionsPopup>`
  height: 32px;
  background-color: ${COLORS.WHITE};
  border-radius: 24px;
  box-shadow: 0px 1px 2px 1px lightgray;
  position: absolute;
  top: -38px;
  left: ${props =>`${props.left}px`};
  display: flex;
  align-items: center;
  padding: 4px 8px;

  button {
    min-height: 32px;

    :hover {
      background: transparent;
      font-size: 32px;
      display: block;
      padding-bottom: 8px;
    }
  }
`;