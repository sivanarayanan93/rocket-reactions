import styled from 'styled-components';
import Avator from '../ui/Avator';
import EmojiIcon from '../ui/EmojiIcon';
import { TReactor } from '../../shared/types/Reactor';


const UiReactor = styled.div`  
  display: flex;
  align-items: center;
  padding: 8px 0;
`

const Reactor = ({reactor}: { reactor: TReactor}) => {
  return (
    <UiReactor>
      <Avator url={reactor.avatar}/>
      <EmojiIcon> {reactor.emoji} </EmojiIcon>
      <div>{reactor.first_name} {reactor.last_name}</div>
    </UiReactor>
  )
}

export default Reactor
