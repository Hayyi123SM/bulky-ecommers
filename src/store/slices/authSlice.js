import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_API_URL } from "../../lib/apiConfig"

// Initial state
const initialState = {
    user: null,
    token: null,
    csrfToken: "",
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

// Fetch CSRF token
export const fetchCSRFToken = createAsyncThunk(
    "auth/fetchCSRFToken",
    async () => {
        try {
            const response = await axios.get("/api/csrf")
            console.log("CSRF token:", response.data.token)
            return response.data.token
        } catch (error) {
            console.error("Error fetching CSRF token:", error)
            throw error
        }
    },
)

// Login
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password, csrfToken }) => {
        console.log("====================================")
        console.log(email, password, csrfToken)
        console.log("====================================")
        try {
            const response = await axios.post(
                `${BASE_API_URL}/auth/web/login`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": csrfToken,
                    },
                },
            )
            console.log("====================================")
            console.log(response.data)
            console.log("====================================")
            return response.data
        } catch (error) {
            console.error("Error logging in:", error)
            throw error
        }
    },
)

// Register
export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password, csrfToken }) => {
        try {
            const response = await axios.post(
                `${BASE_API_URL}/register`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": csrfToken,
                    },
                },
            )
            return response.data
        } catch (error) {
            console.error("Error registering:", error)
            throw error
        }
    },
)

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        await axios.post(`${BASE_API_URL}/logout`)
    } catch (error) {
        console.error("Error logging out:", error)
        throw error
    }
})

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // CSRF Token
            .addCase(fetchCSRFToken.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchCSRFToken.fulfilled, (state, action) => {
                state.csrfToken = action.payload
                state.isLoading = false
            })
            .addCase(fetchCSRFToken.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            // Login
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
                state.isLoading = false
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
                state.isAuthenticated = false
            })
            // Register
            .addCase(register.pending, state => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
                state.isLoading = false
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
                state.isAuthenticated = false
            })
            // Logout
            .addCase(logout.pending, state => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, state => {
                state.user = null
                state.token = null
                state.isAuthenticated = false
                state.isLoading = false
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export default authSlice.reducer
