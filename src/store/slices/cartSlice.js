/* eslint-disable no-useless-catch */
import axios from "@/lib/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: null,
    checkout: null,
    selectedItems: [],
    friends: [],
    totalPrice: 0,
    error: null,
    isLoading: false,
    order: null,
    shippingMethod: null,
    setAddress: null,
    shippingCost: null,
    coupon: null,
    activeCoupon: null,
}

export const addToCart = createAsyncThunk("carts/addToCart", async (data, { rejectWithValue }) => {
    try {
        const params = {
            product_id: data,
        }
        const response = await axios.post("/api/carts/add", params)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchCarts = createAsyncThunk("carts/fetchCarts", async () => {
    try {
        const response = await axios.get("/api/carts")
        return response.data
    } catch (error) {
        throw error
    }
})

export const fetchCheckout = createAsyncThunk("carts/fetchCheckout", async () => {
    try {
        const response = await axios.get("/api/carts?mode=checkout")
        return response.data
    } catch (error) {
        throw error
    }
})

export const updateSelectedItems = createAsyncThunk("carts/updateSelectedItems", async (cartItems, { rejectWithValue }) => {
    try {
        const response = await axios.patch("/api/carts/set-selected-item", {
            cart_items: cartItems,
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const removeItems = createAsyncThunk("carts/removeItems", async (cartItems, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/carts/remove-item/${cartItems}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const setShippingMethod = createAsyncThunk("carts/setShippingMethod", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.patch("/api/carts/set-shipping-method", data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getShippingCost = createAsyncThunk("carts/getShippingCost", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/carts/shipping-cost")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const applyCoupon = createAsyncThunk("carts/applyCoupon", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/carts/apply-coupon", data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const clearCoupon = createAsyncThunk("carts/clearCoupon", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.delete("/api/carts/clear-coupon", data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const setAddress = createAsyncThunk("carts/setAddress", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.patch("/api/carts/set-address", data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const placeOrders = createAsyncThunk("carts/placeOrders", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/carts/place-order", data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const searchFriends = createAsyncThunk("carts/searchFriends", async (data, { rejectWithValue }) => {
    try {
        const params = {
            search: data,
        }
        if (data === "") {
            return initialState
        } else {
            const response = await axios.get("/api/carts/search-friend", {
                params,
            })
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

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
                    state.selectedItems = state.selectedItems.filter(selectedItem => selectedItem.id !== itemId)
                }
                state.totalPrice = state.selectedItems.reduce((total, selectedItem) => total + selectedItem.price.numeric, 0)
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

            state.totalPrice = state.selectedItems.reduce((total, selectedItem) => total + selectedItem.price.numeric, 0)
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
                state.isLoading = true
            })
            .addCase(fetchCarts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.isLoading = false
                state.cart = action.payload.data
            })
            .addCase(fetchCarts.rejected, (state, action) => {
                state.status = "failed"
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(fetchCheckout.pending, state => {
                state.status = "loading"
                state.isLoading = true
            })
            .addCase(fetchCheckout.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.isLoading = false
                state.checkout = action.payload.data
            })
            .addCase(fetchCheckout.rejected, (state, action) => {
                state.status = "failed"
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(updateSelectedItems.pending, state => {
                state.updateStatus = "loading"
                state.isLoading = true
                state.updateError = null
            })
            .addCase(updateSelectedItems.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.isLoading = false
                state.cart = action.payload.data
            })
            .addCase(updateSelectedItems.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.isLoading = false
                state.updateError = action.payload.data || action.error.message
            })
            .addCase(removeItems.pending, state => {
                state.updateStatus = "loading"
                state.isLoading = true
                state.updateError = null
            })
            .addCase(removeItems.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.isLoading = false
                state.cart = action.payload.data
            })
            .addCase(removeItems.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.isLoading = false
                state.updateError = action.payload.data || action.error.message
            })
            .addCase(setShippingMethod.pending, state => {
                state.updateStatus = "loading"
                state.isLoading = true
                state.updateError = null
            })
            .addCase(setShippingMethod.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.isLoading = false
                state.shippingMethod = action.payload.data
            })
            .addCase(setShippingMethod.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.isLoading = false
                state.updateError = action.payload.data || action.error.message
            })
            .addCase(setAddress.pending, state => {
                state.updateStatus = "loading"
                state.isLoading = true
                state.updateError = null
            })
            .addCase(setAddress.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.isLoading = false
                state.setAddress = action.payload.data
            })
            .addCase(setAddress.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.isLoading = false
                state.updateError = action.payload.data || action.error.message
            })
            .addCase(getShippingCost.pending, state => {
                state.updateStatus = "loading"
                state.isLoading = true
                state.updateError = null
            })
            .addCase(getShippingCost.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.isLoading = false
                state.shippingCost = action.payload.data
            })
            .addCase(getShippingCost.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.isLoading = false
                state.shippingCost = action.payload
            })
            .addCase(applyCoupon.pending, state => {
                state.updateStatus = "loading"
                state.isLoading = true
                state.updateError = null
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.isLoading = false
                state.cart = action.payload.data
                state.checkout = action.payload.data
                state.activeCoupon = action.payload.data?.coupon_code || ""
            })
            .addCase(applyCoupon.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.isLoading = false
                state.updateError = action.payload.data || action.error.message
            })
            .addCase(clearCoupon.pending, state => {
                state.updateStatus = "loading"
                state.isLoading = true
                state.updateError = null
            })
            .addCase(clearCoupon.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.isLoading = false
                state.cart = action.payload.data
            })
            .addCase(clearCoupon.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.isLoading = false
                state.updateError = action.payload.data || action.error.message
            })
            .addCase(placeOrders.pending, state => {
                state.updateStatus = "loading"
                state.isLoading = true
                state.updateError = null
            })
            .addCase(placeOrders.fulfilled, (state, action) => {
                state.updateStatus = "succeeded"
                state.isLoading = false
                state.order = action.payload.data
            })
            .addCase(placeOrders.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.isLoading = false
                state.updateError = action.payload.data || action.error.message
            })
            .addCase(searchFriends.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(searchFriends.fulfilled, (state, action) => {
                state.isLoading = false
                state.friends = action.payload.data
            })
            .addCase(searchFriends.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})

export const { toggleSelectItem, toggleSelectAllItems } = cartSlice.actions
export default cartSlice.reducer
