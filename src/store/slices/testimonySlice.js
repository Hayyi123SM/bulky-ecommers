import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    error: null,
    isLoading: true,
}

export const fetchTestimonies = createAsyncThunk(
    "testimony/fetchTestimonies",
    async params => {
        try {
            const response = await axios.get("/api/testimony", { params })
            // console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching testimony:", error) // Log errors
            throw error
        }
    },
)

const testimonySlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTestimonies.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchTestimonies.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.items = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchTestimonies.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export const { setStateProduct, setProductName, initializeProduct } =
    testimonySlice.actions
export default testimonySlice.reducer
