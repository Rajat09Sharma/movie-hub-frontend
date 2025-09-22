import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: null, userId: null, role: null }
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthToken(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.role = action.payload.role;
        },
        logout(state) {
            state.token = null;
            state.userId = null;
            state.role = null;
        }
    }
});


export const authAction = authSlice.actions;
export default authSlice.reducer;
