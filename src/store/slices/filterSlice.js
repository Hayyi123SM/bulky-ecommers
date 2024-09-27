import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    categories: [],
    warehouses: [],
    conditions: [],
    statuses: [],
    brands: [],
    selectedFilters: {
        categories: [],
        warehouses: [],
        conditions: [],
        statuses: [],
        brands: [],
    },
    error: null,
    isLoading: true,
}

export const fetchCategories = createAsyncThunk(
    "filters/fetchCategories",
    async () => {
        try {
            const response = await axios.get("/api/products/filter/categories")
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching filter categories:", error) // Log errors
            throw error
        }
    },
)

export const fetchWarehouses = createAsyncThunk(
    "filters/fetchWarehouses",
    async () => {
        try {
            const response = await axios.get("/api/products/filter/warehouse")
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching filter warehouses:", error) // Log errors
            throw error
        }
    },
)

export const fetchConditions = createAsyncThunk(
    "filters/fetchConditions",
    async () => {
        try {
            const response = await axios.get("/api/products/filter/conditions")
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching filter conditions:", error) // Log errors
            throw error
        }
    },
)

export const fetchStatuses = createAsyncThunk(
    "filters/fetchStatuses",
    async () => {
        try {
            const response = await axios.get("/api/products/filter/statuses")
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching filter statuses:", error) // Log errors
            throw error
        }
    },
)

export const fetchBrands = createAsyncThunk("filters/fetchBrands", async () => {
    try {
        const response = await axios.get("/api/products/filter/warehouse")
        console.log("API response:", response.data) // Log the API response
        return response.data
    } catch (error) {
        console.error("Error fetching filter brands:", error) // Log errors
        throw error
    }
})

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters(state, action) {
            console.log("Action in setFilters:", action)
            state.selectedFilters = {
                ...state.selectedFilters,
                ...action.payload,
            }
        },
    },
    extraReducers: builder => {
        builder
            // Fetch categories
            .addCase(fetchCategories.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.categories = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })

            // Fetch warehouses
            .addCase(fetchWarehouses.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchWarehouses.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.warehouses = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchWarehouses.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })

            // Fetch conditions
            .addCase(fetchConditions.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchConditions.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.conditions = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchConditions.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })

            // Fetch statuses
            .addCase(fetchStatuses.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchStatuses.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.statuses = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchStatuses.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })

            // Fetch brands
            .addCase(fetchBrands.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.brands = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export const { setFilters } = filterSlice.actions
export default filterSlice.reducer
