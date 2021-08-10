import {useEffect, useState, useRef, useLayoutEffect } from 'react'
import Reactors from '../Reactors'
import { getContentReactorsByReaction } from '../../shared/Reactions/ReactionsApi';
import { UiSummary } from './styles';
import useOutsideChecker from '../../hooks/UseOutsideChecker';
import { TReaction, TReactions } from '../../shared/Reactions/TReactions';
import { TStringOrNumber } from '../../shared/common/TCommon';
import ReactionTabs from './ReactionTabs';
import TabPanel from '../ui/Tabs/TabPanel';
import Spinner from '../ui/Spinner';

type TSummaryReaction = {
  postId: TStringOrNumber,
  shouldShow: boolean,
  onClose: any,
  activeTab: TStringOrNumber,
  tabList: TReactions
}

const SummaryReactions = ({postId, activeTab, tabList, onClose, shouldShow, ...props}: TSummaryReaction) => {
  const [currentTab, setCurrentTab] = useState(activeTab),
    [reactors, setReactors] = useState<any>({}),
    [tabs, setTabs] = useState(tabList),
    [top, setTop] = useState(0),
    [isLoading, setIsLoading] = useState(false),
    targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTabs([...[{id: 'ALL', emoji: 'All'} as TReaction], ...tabList]);
  }, [tabList]);

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab])

  useEffect(() => {
    const currentTabReactors = reactors[currentTab] || [];
    
    const successgetContentReactorsCallback = (res: any, currentTabReactors: any) => {
      setReactors({
        ...reactors,
        [currentTab]: [...currentTabReactors, ...[...res]]
      })
    }

    if (currentTabReactors && !currentTabReactors.length) {
      setIsLoading(true);
      getContentReactorsByReaction(postId, currentTab).then((res) => {
        if(targetRef.current) {
          successgetContentReactorsCallback(res, currentTabReactors);
          setIsLoading(false);
        }
      }).catch(() => {
        if(targetRef.current) {
          setIsLoading(false);
        }
      })
    }
  }, [currentTab, postId, reactors, targetRef]);

  const handleOnTabClick = (tabId: TStringOrNumber) => {
    if(tabId) {
      setCurrentTab(tabId);
    }
  }

  useLayoutEffect(() => {
    const ele = targetRef.current,
      parentEle = ele && ele.offsetParent as HTMLElement;

    if (parentEle) {
      setTop(parentEle.offsetTop >= 310 ? -300 : 52)
    }
  }, [targetRef])

  useOutsideChecker(targetRef, onClose);

  return (
    <>
    {shouldShow && 
      <UiSummary {...props} ref={targetRef} position={top + 'px'}>
        <h4>Reactions</h4>
        <ReactionTabs tabs={tabs} activeTab={currentTab} handleOnTabClick={handleOnTabClick}/>
        <TabPanel>
          {isLoading ? <Spinner /> : <Reactors reactors={reactors[currentTab]}/>}
        </TabPanel>
      </UiSummary>
    }
    </>
  )
}

export default SummaryReactions
