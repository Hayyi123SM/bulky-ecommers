import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    addresses: [],
    detailAddress: {},
    error: [],
    isLoading: false,
}

export const fetchAddresses = createAsyncThunk(
    "address/fetchAddresses",
    async () => {
        try {
            const response = await axios.get("/api/user/address")
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching addresses:", error) // Log errors
            throw error
        }
    },
)

export const addAddress = createAsyncThunk(
    "address/addAddress",
    async (data, { rejectWithValue }) => {
        try {
            const param = {
                label: data.label,
                name: data.name,
                phone_number: data.phoneNumber,
                address: data.address,
                province_id: data.provinceId,
                city_id: data.cityId,
                district_id: data.districtId,
                sub_district_id: data.subDistrictId,
                latitude: data.latitude,
                longitude: data.longitude,
            }
            const response = await axios.post("/api/user/address/create", param)
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error adding address:", error) // Log errors
            return rejectWithValue(error.response.data)
        }
    },
)

export const fetchAddressDetail = createAsyncThunk(
    "address/fetchAddressDetail",
    async id => {
        try {
            const response = await axios.get(`/api/user/address/detail/${id}`)
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error fetching address detail:", error) // Log errors
            throw error
        }
    },
)

export const removeAddress = createAsyncThunk(
    "address/removeAddress",
    async id => {
        try {
            const response = await axios.delete(
                `/api/user/address/delete/${id}`,
            )
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error removing address:", error) // Log errors
            throw error
        }
    },
)

export const updateAddress = createAsyncThunk(
    "address/updateAddress",
    async (data, { rejectWithValue }) => {
        try {
            const param = {
                address_id: data.addressId,
                label: data.label,
                name: data.name,
                phone_number: data.phoneNumber,
                address: data.address,
                province_id: data.provinceId,
                city_id: data.cityId,
                district_id: data.districtId,
                sub_district_id: data.subDistrictId,
                latitude: data.latitude,
                longitude: data.longitude,
            }
            const response = await axios.put(`/api/user/address/edit`, param)
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error updating address:", error) // Log errors
            return rejectWithValue(error.response.data)
        }
    },
)

export const setAddressPrimary = createAsyncThunk(
    "address/setAddressPrimary",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `/api/user/address/set-primary/${id}`,
            )
            console.log("API response:", response.data) // Log the API response
            return response.data
        } catch (error) {
            console.error("Error setting address primary:", error) // Log errors
            return rejectWithValue(error.response.data)
        }
    },
)

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAddresses.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.isLoading = false
                state.addresses = action.payload.data
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })
            .addCase(addAddress.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.addresses.push(action.payload)
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.errors
            })
            .addCase(fetchAddressDetail.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchAddressDetail.fulfilled, (state, action) => {
                state.isLoading = false
                state.detailAddress = action.payload.data
            })
            .addCase(fetchAddressDetail.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })
            .addCase(updateAddress.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.detailAddress = action.payload.data
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.errors
            })
    },
})

export default addressSlice.reducer
