import { createStore } from "redux";
import { rootReducer } from "store/rootReducers";

export const store = createStore(rootReducer)
