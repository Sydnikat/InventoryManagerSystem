import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models/user";

export interface UserState {
  user?: IUser;
}

const initialUserState: UserState = {
  user: undefined,
};

export const user = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<(IUser | undefined)>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = user.actions;
export const userReducer = user.reducer;
