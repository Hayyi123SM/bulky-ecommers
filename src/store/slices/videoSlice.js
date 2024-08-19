import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    error: null,
    isLoading: false,
}

export const fetchVideos = createAsyncThunk(
    "videos/fetchVideos",
    async currentPage => {
        try {
            const response = await axios.get(`/api/videos`, {
                params: { paginate: currentPage },
            })
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching videos:", error) // Log errors
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
