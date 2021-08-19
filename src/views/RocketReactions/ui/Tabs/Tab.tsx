import React from 'react';
import { TStringOrNumber } from '../../../../shared/common/TCommon';
import { UiTab } from './styles';

export type TTab = {
  id: TStringOrNumber,
  isActive: boolean,
  children: React.ReactNode,
  onClick: () => void
}

const Tab = ({id, children, isActive, ...props}: TTab) => {
  return (
    <UiTab isActive={isActive} {...props} data-tab-id={id} key={`tab_${id}`}>
      {children}
    </UiTab>
  )
}

export default Tab;
