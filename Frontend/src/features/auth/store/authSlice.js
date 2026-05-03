import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token ?? null;
            state.isAuthenticated = true;
        },
        setLoading: (state, action) => {
            state.Loading = action.payload.Loading;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;