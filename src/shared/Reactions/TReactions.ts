import { TStringOrNumber } from "../common/TCommon";
import { TUser } from "../Users/TUsers";

export type TReaction = {
  id?: string,
  emoji: string | undefined,
  count?: number,
  isReactedByCurrentUser?: boolean,
  userId?: TStringOrNumber | undefined,
  contentReactionId?: TStringOrNumber
  users?: TUser[],
  name?: string
}

export type TReactions = TReaction[];

export interface IReactor extends TUser {
  emoji: string | null
}