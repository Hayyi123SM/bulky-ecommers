import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    provinces: [],
    cities: [],
    districts: [],
    subDistricts: [],
    error: null,
    isLoading: false,
}

export const fetchProvinces = createAsyncThunk(
    "area/fetchProvinces",
    async () => {
        try {
            const response = await axios.get("/api/area/provinces")
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching area:", error) // Log errors
            throw error
        }
    },
)

export const fetchCities = createAsyncThunk(
    "area/fetchCities",
    async provinceId => {
        try {
            console.log("====================================")
            console.log("Province ID:", provinceId)
            console.log("====================================")
            const response = await axios.get("/api/area/cities/" + provinceId)
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching area:", error) // Log errors
            throw error
        }
    },
)

export const fetchDistricts = createAsyncThunk(
    "area/fetchDistricts",
    async cityId => {
        try {
            const response = await axios.get("/api/area/districts/" + cityId)
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching area:", error) // Log errors
            throw error
        }
    },
)

export const fetchSubDistricts = createAsyncThunk(
    "area/fetchSubDistricts",
    async districtId => {
        try {
            const response = await axios.get(
                "/api/area/sub-districts/" + districtId,
            )
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching area:", error) // Log errors
            throw error
        }
    },
)

const areaSlice = createSlice({
    name: "area",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProvinces.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProvinces.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.provinces = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchProvinces.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchCities.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.cities = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchDistricts.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchDistricts.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.districts = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchDistricts.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchSubDistricts.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchSubDistricts.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                console.log("Current state:", state)
                state.subDistricts = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchSubDistricts.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export default areaSlice.reducer
