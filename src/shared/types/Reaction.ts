export type TReaction = {
  id: number | string,
  name?: string,
  emoji: string | undefined,
  count: number,
  isReactedByCurrentUser: boolean,
  userId?: number | string | undefined,
  contentReactionId?: number | string
}