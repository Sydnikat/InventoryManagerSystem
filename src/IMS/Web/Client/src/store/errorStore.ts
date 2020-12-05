import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ErrorState {
  message: string | null;
  statusCode: number | null;
}

const initialErrorState: ErrorState = {
  message: null,
  statusCode: null,
};

export const error = createSlice({
  name: "error",
  initialState: initialErrorState,
  reducers: {
    setError(
      state: ErrorState,
      action: PayloadAction<{ status: number | null, message: string | null }>
    ) {
      state.message = action.payload.message;
      state.statusCode = action.payload.status;
    },
  },
});

export const { setError } = error.actions;
export const errorReducer = error.reducer;