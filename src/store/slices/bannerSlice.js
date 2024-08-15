import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_API_URL } from "../../lib/apiConfig"

const initialState = {
    items: [],
    error: null,
    isLoading: false,
}

export const fetchBanners = createAsyncThunk(
    "banners/fetchBanners",
    async currentPage => {
        try {
            const itemsPerPage = 10
            const response = await axios.get(`${BASE_API_URL}/banners`, {
                params: { page: currentPage, limit: itemsPerPage },
            })
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching banners:", error) // Log errors
            throw error
        }
    },
)

const bannerSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchBanners.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.items = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export const { setStateProduct, setProductName, initializeProduct } =
    bannerSlice.actions
export default bannerSlice.reducer
