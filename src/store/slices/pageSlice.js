import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    item: {},
    floatingButton: {},
    reviews: [],
    error: null,
    isLoading: true,
}

export const fetchPages = createAsyncThunk("pages/fetchPages", async params => {
    try {
        const response = await axios.get(`/api/pages/${params}`)
        // console.log("API response pages:", response.data.data) // Log the API response
        return response.data
    } catch (error) {
        console.error("Error fetching pages:", error) // Log errors
        throw error
    }
})

export const fetchFloatingWhatsapp = createAsyncThunk(
    "pages/fetchFloatingWhatsapp",
    async () => {
        try {
            const response = await axios.get("/api/general/floating-button")
            return response.data
        } catch (error) {
            console.error("Error fetching pages:", error) // Log errors
            throw error
        }
    },
)

export const getGeneralReview = createAsyncThunk(
    "pages/getGeneralReview",
    async () => {
        try {
            const response = await axios.get("/api/general/reviews")
            return response.data
        } catch (error) {
            console.error("Error fetching pages:", error) // Log errors
            throw error
        }
    },
)

const pagesSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPages.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchPages.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.item = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchPages.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchFloatingWhatsapp.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchFloatingWhatsapp.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.floatingButton = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchFloatingWhatsapp.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(getGeneralReview.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getGeneralReview.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.reviews = action.payload.data
                state.isLoading = false
            })
            .addCase(getGeneralReview.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export const { setStateProduct, setProductName, initializeProduct } =
    pagesSlice.actions
export default pagesSlice.reducer
