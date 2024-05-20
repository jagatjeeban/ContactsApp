import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginStatus: false,
    userInfo: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.loginStatus = true;
            state.userInfo = action.payload;
        },
        logOutEvent(state) {
            state.loginStatus = false;
            state.userInfo = {};
        }
    }
});

export const { loginSuccess, logOutEvent } = authSlice.actions;
export default authSlice.reducer;