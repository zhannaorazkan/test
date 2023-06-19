import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginError: false,
    },
    reducers: {
        setLoginError: (state, action) => {
            state.loginError = action.payload;
        },
    },
});

export const { setLoginError } = authSlice.actions;
export default authSlice.reducer;
