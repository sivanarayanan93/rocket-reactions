import { TReaction } from "../types/Reaction"
import { User } from "../types/User"

const initState = {
  currentUser: {} as User,
  reactions: [] as TReaction[]
}

type TAction = {
  type: string,
  payload: {
    [key: string]: any
  }
}

export type TUserReducer = {
  currentUser:  User,
  reactions: TReaction[]
}

const UserReducer = (state:TUserReducer = initState, action:TAction) => {
  switch(action.type) {
    case "ADD_USER_INFO":
      return { ...state,
        currentUser: action.payload.user, reactions: [...state.reactions, ...action.payload.reactions]
      }

      default:
        return state;
  }
}

export default UserReducer;