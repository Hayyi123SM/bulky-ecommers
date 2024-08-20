import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    error: null,
    isLoading: false,
}

export const addToCart = createAsyncThunk(
    "carts/addToCart",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/carts/add", data)
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error adding to cart:", error) // Log errors
            return rejectWithValue(error.response.data)
        }
    },
)

export const fetchCarts = createAsyncThunk(
    "carts/fetchCarts",
    async currentPage => {
        try {
            const itemsPerPage = 10
            const response = await axios.get("/api/carts", {
                params: { page: currentPage, limit: itemsPerPage },
            })
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching carts:", error) // Log errors
            throw error
        }
    },
)

const cartSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addToCart.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.items = action.payload
                state.isLoading = false
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchCarts.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchCarts.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.items = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchCarts.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export default cartSlice.reducer
