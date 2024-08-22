import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    productDetails: {},
    relatedProducts: [],
    searchResults: [],
    totalPages: 0,
    error: null,
    isLoading: false,
}

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ currentPage, filters }) => {
        try {
            // Build the params object dynamically
            const params = {
                page: currentPage,
                ...(filters.perPage && { per_page: filters.perPage }),
                ...(filters.search && { search: filters.search }),
                ...(filters.categories &&
                    filters.categories.length && {
                        category: filters.categories.join(","),
                    }),
                ...(filters.conditions &&
                    filters.conditions.length && {
                        condition: filters.conditions.join(","),
                    }),
                ...(filters.statuses &&
                    filters.statuses.length && {
                        status: filters.statuses.join(","),
                    }),
                ...(filters.warehouses &&
                    filters.warehouses.length && {
                        warehouse: filters.warehouses.join(","),
                    }),
                ...(filters.priceMin && { price_min: filters.priceMin }),
                ...(filters.priceMax && { price_max: filters.priceMax }),
                ...(filters.brands &&
                    filters.brands.length && { brands: filters.brands }),
            }

            const response = await axios.get(`/api/products`, {
                params,
                paramsSerializer: params => {
                    return new URLSearchParams(params).toString()
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

export const fetchSearchProducts = createAsyncThunk(
    "products/fetchSearchProducts",
    async ({ currentPage, filters }) => {
        try {
            // Build the params object dynamically
            const params = {
                page: currentPage,
                ...(filters.search && { search: filters.search }),
            }

            const response = await axios.get(`/api/products`, {
                params,
                paramsSerializer: params => {
                    return new URLSearchParams(params).toString()
                },
            })

            console.log("API response Search Product:", response.data) // Log the API response
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
            .addCase(fetchSearchProducts.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchSearchProducts.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.searchResults = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchSearchProducts.rejected, (state, action) => {
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
