import { combineReducers } from "redux"
import { avatarReducer } from "./avatarReducer"
import { characterReducer } from "./characterReducer"
import loginReducer from "./loginReducer"
import { modalConfirmReducer } from "./modalConfirmReducer"
import { userReducer } from "./userReducer"
import { viewModalCharacterReducer } from "./viewModalCharacterReducer"

export const rootReducer = combineReducers({
     avatar: avatarReducer,
     login: loginReducer,
     user: userReducer,
     character: characterReducer,
     modalViewCharacter: viewModalCharacterReducer,
     modalConfirm: modalConfirmReducer, 
  })