import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authService from './authService';

//Get user from localStorage token
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register User; Async thunk takes in an action (auth/register)
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    //not asynchronous
    reducers: {
        reset: (state) => {
            state.isError = false,
            state.isLoading = false,
            state.isSuccess = false,
            state.message = ''
        }
    },
    //asynchronous reducers, where pending, fulfilled and rejected are automatic states
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer