import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Username {
    username: string
}

const initialState: Username = {
    username: ''
}

export const usernameSlice = createSlice({
    name: "username",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        }
    }
})

export const { setUsername } = usernameSlice.actions
export default usernameSlice.reducer