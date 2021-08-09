import React from 'react';
import { TStringOrNumber } from '../../../shared/common/TCommon';
import { TReactions } from '../../../shared/Reactions/TReactions';
import { UiTabs, Tab } from './styles';

type TTabs = {
  tabs: TReactions,
  activeTab: TStringOrNumber,
  handleOnTabClick: (e: React.MouseEvent<HTMLDivElement>) => void
}


const Tabs = ({tabs, activeTab, handleOnTabClick}: TTabs) => {
  return (
    <UiTabs onClickCapture={handleOnTabClick}>
      {tabs && tabs.map((tab) => (
        <Tab data-tab-id={tab.id} data-tab-active-id={activeTab} isActive={activeTab == tab.id} key={`tab_${tab.id}`}>
          {tab.emoji}{tab.count && `.${tab.count}`}
        </Tab>
      ))}
    </UiTabs>
  )
}

export default Tabs;
