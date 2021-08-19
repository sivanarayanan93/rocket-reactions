import { IReactor } from '../../../shared/Reactions/TReactions';
import { UiReactor, UiReactors } from '../style';
import Avatar from '../ui/Avatar';
import EmojiIcon from '../ui/EmojiIcon';

const Reactors = ({ reactors, emoji }: { reactors: IReactor[], emoji: string}) => {
  return (
    <UiReactors>
      {reactors && reactors.map((reactor) => (
        <Reactor key={reactor.id} emoji={emoji} reactor={reactor} />
      ))}
    </UiReactors>
  )
}

const Reactor = ({reactor, emoji}: { reactor: IReactor, emoji: string}) => {
  return (
    <UiReactor>
      <Avatar url={reactor.avatar}/>
      <EmojiIcon> {emoji} </EmojiIcon>

      <div>{reactor.first_name} {reactor.last_name}</div>
    </UiReactor>
  )
}

export default Reactors;
