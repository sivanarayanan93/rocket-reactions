import styled from "styled-components";
import COLORS from '../../shared/colors';

type TUiSummary = {
  position: string
}

export const UiSummary = styled.div<TUiSummary>`
  background-color: ${COLORS.white};
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0px ${COLORS.borderColor};
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  left: calc(-58% + ${props => props.position});

  h3 {
    padding: 0 16px;
  }
`
export const TabPanel = styled.div`
  height: 240px;
  overflow-y: auto;
`