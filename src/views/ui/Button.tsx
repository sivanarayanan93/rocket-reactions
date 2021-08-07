import React from 'react'
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  width: 32px;
  height:32px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background: #fff;
`


const Button = (props: any) => {
  return (
    <ButtonWrapper {...props}>
    </ButtonWrapper>
  )
}

export default Button
