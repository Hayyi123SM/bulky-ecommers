import axios from "@/lib/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createApi } from "@reduxjs/toolkit/query/react"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss"

const initialState = {
    items: [],
    productDetails: {},
    relatedProducts: [],
    searchResults: [],
    totalPages: 0,
    totalItems: 0,
    currentPage: 1,
    error: null,
    isLoading: true,
}

// Custom baseQuery to use axios instance
const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params }) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
            })
            return { data: result.data }
        } catch (axiosError) {
            let err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
    endpoints: builder => ({
        fetchProducts: builder.query({
            query: ({ currentPage, filters }) => {
                const isFilterActive = Boolean(
                    filters.search ||
                        (filters.categories && filters.categories.length) ||
                        (filters.conditions && filters.conditions.length) ||
                        (filters.statuses && filters.statuses.length) ||
                        (filters.warehouses && filters.warehouses.length) ||
                        filters.minPrice ||
                        filters.maxPrice ||
                        (filters.brands && filters.brands.length),
                )

                const params = {
                    page: isFilterActive ? currentPage : currentPage,
                    per_page: filters.perPage || 15,
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
                    ...(filters.minPrice && { price_min: filters.minPrice }),
                    ...(filters.maxPrice && { price_max: filters.maxPrice }),
                    ...(filters.brands &&
                        filters.brands.length && {
                            brands: filters.brands,
                        }),
                }

                const searchParams = new URLSearchParams(params)

                // Handle brands array
                if (filters.brands?.length) {
                    filters.brands.forEach(brand => {
                        searchParams.append("brands[]", brand)
                    })
                }

                return {
                    url: `/api/products?${searchParams.toString()}`,
                    method: "GET",
                }
            },
        }),
    }),
})

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ currentPage, filters }) => {
        try {
            // console.log("====================================")
            // console.log("filters product", filters)
            // console.log("====================================")
            // Build the params object dynamically
            const params = {
                page: currentPage,
                per_page: filters.perPage || 15,
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
                ...(filters.minPrice && { price_min: filters.minPrice }),
                ...(filters.maxPrice && { price_max: filters.maxPrice }),
                ...(filters.brands &&
                    filters.brands.length && { brands: filters.brands }),
            }
            // console.log("====================================")
            // console.log("params", params)
            // console.log("====================================")
            const response = await axios.get(`/api/products`, {
                params,
                paramsSerializer: params => {
                    const searchParams = new URLSearchParams(params)

                    // Handle brands array
                    if (filters.brands?.length) {
                        filters.brands.forEach(brand => {
                            searchParams.append("brands[]", brand)
                        })
                    }

                    return searchParams.toString()
                },
            })

            // console.log("API response Product:", response.data) // Log the API response
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

            // console.log("API response Search Product:", response.data) // Log the API response
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
            // console.log("API response:", response.data) // Log the API response
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
            // console.log("API response:", response.data) // Log the API response
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
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.items = action.payload.data
                state.totalPages = action.payload.meta.last_page
                state.currentPage = action.payload.meta.current_page
                state.totalItems = action.payload.meta.total
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
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
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
                // console.log("Action in fulfilled productDetail:", action)
                // console.log("Current state productDetail:", state)
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
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.relatedProducts = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchProductRelated.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export const { useFetchProductsQuery } = productApi
export const { setStateProduct, setProductName, initializeProduct } =
    productSlice.actions
export default productSlice.reducer
