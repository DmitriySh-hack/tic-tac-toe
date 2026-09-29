import { configureStore } from "@reduxjs/toolkit";
import firstSlice from "./slice/slice";
import usernameSlice from "./slice/usernameSlice";

export const store = configureStore({
    reducer: {
        counter: firstSlice,
        userName: usernameSlice,
    }
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch