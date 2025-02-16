import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated : false,
    user : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state , action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout : (state) => {
            state.isAuthenticated = false;
            state.user = null
        },
        signUp : (state , action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },

        deleteUser : (state , action) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const {login , logout , signUp , deleteUser} = authSlice.actions;
export default authSlice.reducer;