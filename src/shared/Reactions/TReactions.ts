import { TStringOrNumber } from "../common/TCommon";
import { TUser } from "../Users/TUsers";

export type TReaction = {
  id: TStringOrNumber,
  name?: string,
  emoji: string | undefined,
  count: number,
  isReactedByCurrentUser?: boolean,
  userId?: TStringOrNumber | undefined,
  contentReactionId?: TStringOrNumber
  users: TUser[]
}

export type TReactions = TReaction[];

export interface IReactor extends TUser {
  emoji: string | null
}