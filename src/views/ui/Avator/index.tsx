import styled from "styled-components";

const UiAvator = styled.div`  
  display: inherit;
  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
`

const Avator = ({ url }) => {
  return (
    <UiAvator>
      <img src={url} />
    </UiAvator>
  )
}

export default Avator;
