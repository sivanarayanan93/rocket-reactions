import React, {useEffect, useState, useRef } from 'react'
import Reactors from '../Reactors'
import Tabs from '../ui/Tabs'
import { getContentReactorsByReaction } from '../../shared/Reactions/ReactionsApi';
import { UiSummary, TabPanel } from './styles';
import { useOutsideChecker } from '../../hooks/UseOutsideChecker';
import { TReaction, TReactions } from '../../shared/Reactions/TReactions';
import { TStringOrNumber } from '../../shared/common/TCommon';

type TSummaryReaction = {
  postId: TStringOrNumber,
  shouldShow: boolean,
  onClose: any,
  activeTab: TStringOrNumber,
  position: number | null,
  tabList: TReactions
}

const SummaryReactions = ({position, postId, activeTab, tabList, onClose, shouldShow}: TSummaryReaction) => {
  const [currentTab, setCurrentTab] = useState(activeTab),
    [reactors, setReactors] = useState<any>({}),
    [tabs, setTabs] = useState(tabList),
    ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTabs([...[{id: 'ALL', emoji: 'ALL'} as TReaction], ...tabList]);
  }, [tabList]);

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab])

  useEffect(() => {
    const currentTabReactors = reactors[currentTab] || [];

    if (currentTabReactors && !currentTabReactors.length) {
      getContentReactorsByReaction(postId, currentTab).then((res) => {
      
        setReactors({
          ...reactors,
          [currentTab]: [...currentTabReactors, ...[...res]]
        })
      })
    }
  }, [currentTab]);

  const handleOnTabClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const tabId = (e.target as HTMLElement).getAttribute('data-tab-id');

    if(tabId) {
      setCurrentTab(tabId);
    }
  }

  useOutsideChecker(ref, onClose);

  return (
    <>
    {shouldShow && 
      <UiSummary ref={ref} position={position + 'px'}>
        <h3>Reactions</h3>
        <Tabs tabs={tabs} activeTab={currentTab} handleOnTabClick={handleOnTabClick}/>
        <TabPanel>
          <Reactors reactors={reactors[currentTab]}/>
        </TabPanel>
      </UiSummary>
    }
    </>
  )
}

export default SummaryReactions
