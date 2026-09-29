import { createSlice } from "@reduxjs/toolkit";

export interface CounterState{
    value: number
}

const initialState: CounterState = {
    value: 0,
}

export const firstSlice = createSlice({
    name: "InitialCounter",
    initialState,
    reducers:{
        increment: (state) => {
            state.value += 1
        }
    },
})

export const { increment } = firstSlice.actions

export default firstSlice.reducer