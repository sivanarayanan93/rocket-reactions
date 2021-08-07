import React from 'react';
import styled from 'styled-components';
import Reactor from './Reactor';


const UiReactors = styled.div`
  padding: 0 16px;
`

const Reactors: React.FunctionComponent<any> = ({ reactors }) => {
  return (
    <UiReactors>
      {reactors && reactors.map((reactor: any) => (
        <Reactor key={reactor.id} reactor={reactor} />
      ))}
    </UiReactors>
  )
}

export default Reactors;
