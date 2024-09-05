import axios from "@/lib/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    item: null,
    user: null,
    callback: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
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

export const getRedrectUrlGoogle = createAsyncThunk(
    "auth/getRedrectUrlGoogle",
    async () => {
        try {
            const response = await axios.get("/api/auth/web/google")
            console.log("====================================")
            console.log("getRedrectUrlGoogle", response.data.redirect_url)
            console.log("====================================")
            return response.data
        } catch (error) {
            console.error("Error fetching getRedrectUrlGoogle:", error) // Log errors
            throw error
        }
    },
)

export const getCallbackGoogle = createAsyncThunk(
    "auth/getCallbackGoogle",
    async code => {
        try {
            const response = await axios.get("/api/auth/web/google/callback", {
                params: { code },
            })
            console.log("====================================")
            console.log("getCallbackGoogle", response.data)
            console.log("====================================")
            return response.data
        } catch (error) {
            console.error("Error fetching getCallbackGoogle:", error) // Log errors
            throw error
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
            .addCase(getRedrectUrlGoogle.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getRedrectUrlGoogle.fulfilled, (state, action) => {
                console.log("====================================")
                console.log(
                    "getRedrectUrlGoogle fulfilled",
                    action.payload.redirect_url,
                )
                console.log("====================================")
                state.isLoading = false
                state.item = action.payload.redirect_url
            })
            .addCase(getRedrectUrlGoogle.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })
            .addCase(getCallbackGoogle.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getCallbackGoogle.fulfilled, (state, action) => {
                console.log("====================================")
                console.log("getCallbackGoogle fulfilled", action.payload)
                console.log("====================================")
                state.isLoading = false
                state.callback = action.payload
            })
            .addCase(getCallbackGoogle.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })
    },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
