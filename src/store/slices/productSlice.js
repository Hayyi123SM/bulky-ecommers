import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    productDetails: {},
    relatedProducts: [],
    totalPages: 0,
    error: null,
    isLoading: false,
}

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ currentPage, filters }) => {
        try {
            console.log("Filters:", filters)
            const response = await axios.get(`/api/products`, {
                params: {
                    page: currentPage,
                    category: filters.categories.join(","),
                    warehouse: filters.warehouses.join(","),
                    condition: filters.conditions.join(","),
                    status: filters.statuses.join(","),
                },
            })
            console.log("API response Product:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching products:", error) // Log errors
            throw error
        }
    },
)

export const fetchProductDetail = createAsyncThunk(
    "products/fetchProductDetail",
    async slug => {
        try {
            const response = await axios.get(`/api/products/detail/${slug}`)
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching product details:", error) // Log errors
            throw error
        }
    },
)

export const fetchProductRelated = createAsyncThunk(
    "products/fetchProductRelated",
    async slug => {
        try {
            const response = await axios.get(`/api/products/related/${slug}`)
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
                state.items = action.payload.data
                state.totalPages = action.payload.meta.total
                state.isLoading = false
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchProductDetail.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                console.log("Action in fulfilled productDetail:", action)
                console.log("Current state productDetail:", state)
                state.productDetails = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchProductRelated.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProductRelated.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.relatedProducts = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchProductRelated.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export const { setStateProduct, setProductName, initializeProduct } =
    productSlice.actions
export default productSlice.reducer
