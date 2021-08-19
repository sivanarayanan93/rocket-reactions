import styled from "styled-components";

const UiAvatar = styled.div`  
  display: inherit;
  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
`

const Avatar = ({ url }: { url: string}) => {
  return (
    <UiAvatar>
      <img alt="Avatar" src={url} />
    </UiAvatar>
  )
}

export default Avatar;
