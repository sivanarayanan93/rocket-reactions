import { TUser, TUsersReducer } from "./TUsers"

const initState:TUsersReducer = {
  currentUser: {} as TUser,
  reactions: []
}

type TAction = {
  type: string,
  payload: {
    [key: string]: any
  }
}

const UserReducer = (state:TUsersReducer = initState, action:TAction) => {
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