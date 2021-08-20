import { TStringOrNumber } from "../common/TCommon"
import { TReactions } from "../Reactions/TReactions"

export type TUser = {
  id: TStringOrNumber,
  first_name: string,
  last_name: string,
  email: string,
  avatar: string,
  name?: string
}

export type TUsersReducer = {
  currentUser:  TUser,
  users:  TUser[],
  reactions: TReactions
}