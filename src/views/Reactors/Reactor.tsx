import Avatar from '../ui/Avatar';
import EmojiIcon from '../ui/EmojiIcon';
import { IReactor } from '../../shared/Reactions/TReactions';
import { UiReactor } from './styles';

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
