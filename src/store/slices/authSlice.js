import axios from "@/lib/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAuthenticated: false,
}

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/auth/password", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    },
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        clearUser: state => {
            state.user = null
            state.isAuthenticated = false
        },
    },
    extraReducers: builder => {
        builder
            .addCase(changePassword.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                console.log("====================================")
                console.log("changePassword fulfilled", action.payload)
                console.log("====================================")
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })
    },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
