import { combineReducers } from "redux"
import { avatarReducer } from "./avatarReducer"
import { characterReducer } from "./characterReducer"
import loginReducer from "./loginReducer"
import { userReducer } from "./userReducer"

export const rootReducer = combineReducers({
     avatar: avatarReducer,
     login: loginReducer,
     user: userReducer,
     character: characterReducer,
  })