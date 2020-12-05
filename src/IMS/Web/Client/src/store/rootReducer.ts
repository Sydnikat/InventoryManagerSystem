import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from "./categoryStore";
import { userReducer } from "./userStore";
import {errorReducer} from "./errorStore";

export const rootReducer = combineReducers({
  categoryReducer,
  userReducer,
  errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
