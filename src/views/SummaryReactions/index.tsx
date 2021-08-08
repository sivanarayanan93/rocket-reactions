import {useEffect, useState, useRef } from 'react'
import Reactors from '../Reactors'
import Tabs from '../ui/Tabs'
import { getContentReactorsByReaction } from '../../shared/User/UserApi';
import { UiSummary, TabPanel } from './styles';
import { useOutsideChecker } from '../../hooks/UseOutsideChecker';
import { TReaction } from '../../shared/types/Reaction';

type TSummaryReaction = {
  postId: number | string,
  shouldShow: boolean,
  onClose: any,
  activeTab: string | number,
  position: number | null,
  tabList: TReaction[]
}

const SummaryReactions = ({position, postId, activeTab, tabList, onClose, shouldShow}: TSummaryReaction) => {
  const [currentTab, setCurrentTab] = useState(activeTab),
    [reactors, setReactors] = useState<any>({}),
    [tabs, setTabs] = useState(tabList),
    ref = useRef(null);

  useOutsideChecker(ref, onClose);
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
