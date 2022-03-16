import { combineReducers } from "redux"
import { avatarReducer } from "./avatarReducer"

export const rootReducer = combineReducers({
     avatar: avatarReducer
  })