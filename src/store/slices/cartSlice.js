/* eslint-disable no-useless-catch */
import axios from "@/lib/axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    cart: null,
    selectedItems: [],
    totalPrice: 0,
    error: null,
    isLoading: false,
    order: null,
}

export const addToCart = createAsyncThunk(
    "carts/addToCart",
    async (data, { rejectWithValue }) => {
        try {
            const params = {
                product_id: data,
            }
            const response = await axios.post("/api/carts/add", params)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    },
)

export const fetchCarts = createAsyncThunk("carts/fetchCarts", async () => {
    try {
        const response = await axios.get("/api/carts")
        return response.data
    } catch (error) {
        throw error
    }
})

export const updateSelectedItems = createAsyncThunk(
    "carts/updateSelectedItems",
    async (cartItems, { rejectWithValue }) => {
        try {
            const response = await axios.patch("/api/carts/set-selected-item", {
                cart_items: cartItems,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    },
)

export const removeItems = createAsyncThunk(
    "carts/removeItems",
    async (cartItems, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `/api/carts/remove-item/${cartItems}`,
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    },
)

export const placeOrders = createAsyncThunk(
    "carts/placeOrders",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/carts/place-order", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    },
)

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        toggleSelectItem(state, action) {
            const { itemId, isSelected } = action.payload
            const item = state.cart.items.find(item => item.id === itemId)
            if (item) {
                item.is_selected = isSelected ? 1 : 0
                if (isSelected) {
                    state.selectedItems.push(item)
                } else {
                    state.selectedItems = state.selectedItems.filter(
                        selectedItem => selectedItem.id !== itemId,
                    )
                }
                state.totalPrice = state.selectedItems.reduce(
                    (total, selectedItem) => total + selectedItem.price.numeric,
                    0,
                )
            }
        },
        toggleSelectAllItems(state, action) {
            const isSelected = action.payload
            state.cart.items.forEach(item => {
                item.is_selected = isSelected ? 1 : 0
            })

            if (isSelected) {
                state.selectedItems = [...state.cart.items]
            } else {
                state.selectedItems = []
            }

            state.totalPrice = state.selectedItems.reduce(
                (total, selectedItem) => total + selectedItem.price.numeric,
                0,
            )
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addToCart.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload.data
                state.isLoading = false
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchCarts.pending, state => {
                state.status = "loading"
            })
            .addCase(fetchCarts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.cart = action.payload.data
            })
            .addCase(fetchCarts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(updateSelectedItems.pending, state => {
                state.updateStatus = "loading"
                state.updateError = null
            })
            .addCase(updateSelectedItems.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.cart = action.payload.data
            })
            .addCase(updateSelectedItems.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.updateError = action.payload.data || action.error.message
            })
            .addCase(removeItems.pending, state => {
                state.updateStatus = "loading"
                state.updateError = null
            })
            .addCase(removeItems.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.cart = action.payload.data
            })
            .addCase(removeItems.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.updateError = action.payload.data || action.error.message
            })
            .addCase(placeOrders.pending, state => {
                state.updateStatus = "loading"
                state.updateError = null
            })
            .addCase(placeOrders.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.order = action.payload.data
            })
            .addCase(placeOrders.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.updateError = action.payload.data || action.error.message
            })
    },
})

export const { toggleSelectItem, toggleSelectAllItems } = cartSlice.actions
export default cartSlice.reducer
