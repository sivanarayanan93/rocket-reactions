import styled from 'styled-components';

export const UiTabs = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`
interface TabProps {
  readonly isActive?: boolean;
};

export const Tab = styled.div<TabProps>`
  height: 40px;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;
  display: flex;
  font-size: 14px;

  ${(props) => props && props.isActive && `box-shadow: 0px 1px 0px 0px #0f62fe;border-bottom: 1px solid #0f62fe;`}
  
`