import {useEffect, useState} from 'react'
import styled from 'styled-components'
import Colors from '../../shared/colors'
import Reactors from '../Reactors'
import Tabs from './Tabs'

const UiSummary = styled.div`
  background-color: ${Colors.white};
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0px ${Colors.borderColor};
  font-size: 14px;
  font-weight: 600;
  height: 300px;
  overflow-y: auto;
  position: absolute;

  h3 {
    padding: 0 16px;
  }
`
const TabPanel = styled.div`
  backgroud-color: red;
`



const SummaryReactions = ({activeTab, tabList}) => {
  const [currentTab, setCurrentTab] = useState(activeTab),
    [reactors, setReactors] = useState({}),
    [tabs, setTabs] = useState(tabList)

  useEffect(() => {
    setTabs([...[{id: 'ALL', emoji: 'ALL'}], ...tabList]);
  }, [tabList]);

  useEffect(() => {
    const currentTabReactors = reactors[currentTab] || [];

    const randomUser = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    setReactors({
      ...reactors,
      [currentTab]: [...currentTabReactors, ...[{id: randomUser, emoji: '❤️', name: 'Siva' + randomUser, url: 'https://dummyimage.com/128x134.png/dddddd/000000' }]]});
  }, [currentTab]);

  const handleOnTabClick = (e) => {
    const tabId = e.target.getAttribute('data-tab-id');

    if(tabId) {
      setCurrentTab(tabId);
    }
  }



  return (
    <UiSummary>
      <h3>Reactions</h3>
      <Tabs tabs={tabs} activeTab={currentTab} handleOnTabClick={handleOnTabClick}/>
      <TabPanel>
        <Reactors reactors={reactors[currentTab]}/>
      </TabPanel>
    </UiSummary>
  )
}

export default SummaryReactions
