import styled from "styled-components";
import COLORS from "../../shared/colors";

export const UiReactionsPickerTrigger = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  .added-reactions {
    line-height: 40px;
  }
`

type TUiReactionsPopup = {
  [key: string]: any
};

export const RocketReactions = styled.div`
  display: flex;
  padding: 10px 0;
`

export const UiReactionsPickerTriggerPopup = styled.div<TUiReactionsPopup>`
  height: 32px;
  background-color: ${COLORS.WHITE};
  border-radius: 24px;
  box-shadow: 0px 1px 2px 1px lightgray;
  position: absolute;
  top: -50px;
  left: ${props =>`${props.left}px`};
  display: flex;
  align-items: center;
  padding: 4px 8px;

  button {
    min-height: 32px;

    :hover {
      background: transparent;
      display: block;
      padding-bottom: 8px;
      transform: scale(2);
      transform-origin: 15px 15px;
    }
  }
`;

type TUiSummary = {
  position?: string
}

export const UiSummary = styled.div<TUiSummary>`
  background-color: ${COLORS.WHITE};
  border-radius: 4px;
  box-shadow: 0px 1px 4px 2px ${COLORS.LIGHT_GRAY};
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  min-width: 300px;
  top: ${props => `${props.position}`};
  z-index: 999;

  h4 {
    padding: 0 16px;
    margin-bottom: 0px;
  }
`

export const UiReactors = styled.div`
  padding: 0 16px;
`

export const UiReactor = styled.div`  
display: flex;
align-items: center;
padding: 8px 0;
`