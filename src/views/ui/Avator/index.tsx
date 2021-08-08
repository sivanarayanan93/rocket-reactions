import styled from "styled-components";

const UiAvator = styled.div`  
  display: inherit;
  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
`

const Avator = ({ url }: { url: string}) => {
  return (
    <UiAvator>
      <img alt="Avator" src={url} />
    </UiAvator>
  )
}

export default Avator;
