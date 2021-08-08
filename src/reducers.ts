import { combineReducers } from 'redux';
import  UserReducer, { TUserReducer }  from './shared/User/UserReducer';


export type TReducers = {
  User: TUserReducer
}

const Reducers = combineReducers({
  User: UserReducer
})

export default Reducers;