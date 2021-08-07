import styled from 'styled-components';
import Avator from '../ui/Avator';
import EmojiIcon from '../ui/EmojiIcon';


const UiReactor = styled.div`  
  display: flex;
  align-items: center;
  padding: 8px 0;
`

const Reactor = ({reactor}: any) => {
  return (
    <UiReactor>
      <Avator url={reactor.url}/>
      <EmojiIcon> {reactor.emoji} </EmojiIcon>
      <div>{reactor.name}</div>
    </UiReactor>
  )
}

export default Reactor
