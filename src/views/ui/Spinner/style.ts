import styled from 'styled-components';
import COLORS from '../../../shared/colors';

const {LIGHT_GRAY, PRIMARY_BLUE} = COLORS;

export const UiSpinner = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  div.spinner {
    border: 3px solid ${LIGHT_GRAY}; 
    border-top: 3px solid ${PRIMARY_BLUE};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
`