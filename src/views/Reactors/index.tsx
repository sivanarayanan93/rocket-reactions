import React from 'react';
import { IReactor } from '../../shared/Reactions/TReactions';

import Reactor from './Reactor';
import { UiReactors } from './styles';

const Reactors = ({ reactors }: { reactors: IReactor[]}) => {
  return (
    <UiReactors>
      {reactors && reactors.map((reactor) => (
        <Reactor key={reactor.id} reactor={reactor} />
      ))}
    </UiReactors>
  )
}

export default Reactors;
