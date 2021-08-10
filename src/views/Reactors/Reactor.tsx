import styled from 'styled-components';
import Avatar from '../ui/Avatar';
import EmojiIcon from '../ui/EmojiIcon';
import { IReactor } from '../../shared/Reactions/TReactions';

const UiReactor = styled.div`  
  display: flex;
  align-items: center;
  padding: 8px 0;
`

const Reactor = ({reactor}: { reactor: IReactor}) => {
  return (
    <UiReactor>
      <Avatar url={reactor.avatar}/>
      <EmojiIcon> {reactor.emoji} </EmojiIcon>
      <div>{reactor.first_name} {reactor.last_name}</div>
    </UiReactor>
  )
}

export default Reactor
