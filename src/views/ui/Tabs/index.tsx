import React from 'react';
import { TStringOrNumber } from '../../../shared/common/TCommon';
import { TReactions } from '../../../shared/Reactions/TReactions';
import EmojiIcon from '../EmojiIcon';
import { UiTabs, Tab } from './styles';

type TTabs = {
  tabs: TReactions,
  activeTab: TStringOrNumber,
  handleOnTabClick: (id: TStringOrNumber, e: React.MouseEvent<HTMLDivElement>) => void
}


const Tabs = ({tabs, activeTab, handleOnTabClick}: TTabs) => {
  return (
    <UiTabs>
      {tabs && tabs.map((tab) => (
        <Tab onClick={e => handleOnTabClick(tab.id, e)} data-tab-id={tab.id} data-tab-active-id={activeTab} isActive={activeTab == tab.id} key={`tab_${tab.id}`}>
          <EmojiIcon>
            {tab.emoji}
            {tab.count && <>
              <label className="emoji-count">.</label>
              <label className="emoji-count">{tab.count}</label>
            </>
            }
          </EmojiIcon>
        </Tab>
      ))}
    </UiTabs>
  )
}

export default Tabs;
