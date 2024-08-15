import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_API_URL } from "../../lib/apiConfig"

const initialState = {
    items: [],
    productDetails: {},
    totalPages: 0,
    error: null,
    isLoading: false, // Add isLoading state
}

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async currentPage => {
        try {
            const itemsPerPage = 10
            const response = await axios.get(`${BASE_API_URL}/products`, {
                params: { page: currentPage, limit: itemsPerPage },
            })
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching products:", error) // Log errors
            throw error
        }
    },
)

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.items = action.payload.products
                state.totalPages = action.payload.total
                state.isLoading = false
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export const { setStateProduct, setProductName, initializeProduct } =
    productSlice.actions
export default productSlice.reducer
