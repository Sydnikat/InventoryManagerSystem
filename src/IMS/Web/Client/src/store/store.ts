import { CombinedState, configureStore, DeepPartial } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./rootReducer";
import { UserState } from "./userStore";

function saveToLocalStorage(state: RootState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage():
  | DeepPartial<
      CombinedState<{
        userReducer: UserState;
      }>
    >
  | undefined {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState) as DeepPartial<
      CombinedState<{
        userReducer: UserState;
      }>
    >;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type AppDispatch = typeof store.dispatch;
