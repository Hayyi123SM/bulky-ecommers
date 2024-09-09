/* eslint-disable no-useless-catch */
import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    totalPages: 0,
    currentPage: 1,
    error: null,
    isLoading: false,
}

export const fetchVideos = createAsyncThunk(
    "videos/fetchVideos",
    async params => {
        try {
            const response = await axios.get(`/api/videos`, {
                params: {
                    page: params.page,
                    paginate: 1,
                    per_page: params.perPage || 15, // default to 1 per page
                },
            })
            return response.data
        } catch (error) {
            throw error
        }
    },
)

export const fetchVideoDetail = createAsyncThunk(
    "videos/fetchVideoDetail",
    async videoId => {
        try {
            const response = await axios.get(`/api/videos/show/${videoId}`)
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching videos:", error) // Log errors
            throw error
        }
    },
)

const videoSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchVideos.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.items = action.payload.data
                state.totalPages = action.payload.meta.last_page
                state.currentPage = action.payload.meta.current_page
                state.isLoading = false
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchVideoDetail.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchVideoDetail.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.items = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchVideoDetail.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export default videoSlice.reducer
