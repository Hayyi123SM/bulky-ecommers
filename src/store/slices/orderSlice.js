import axios from "@/lib/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// const csrf = () => axios.get("/sanctum/csrf-cookie")

const initialState = {
    information: {},
    orders: [],
    orderDetail: {},
    paymentMethod: [],
    invoiceOrders: [],
    afterCreatePayment: {},
    afterSetInvoiceAmount: {},
    myInvoice: {},
    totalPages: 0,
    budgets: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    completeOrder: null,
}

export const getPickupInformation = createAsyncThunk("orders/getPickupInformation", async () => {
    try {
        const response = await axios.get("/api/carts/get-pickup-info")
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const fetchPaymentMethod = createAsyncThunk("orders/fetchPaymentMethod", async () => {
    try {
        const response = await axios.get("/api/orders/invoice/get-payment-methods")
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async ({ currentPage, filters }, { rejectWithValue }) => {
    try {
        const params = {
            page: currentPage,
            per_page: filters.perPage || 15,
            ...(filters.type && { type: filters.type }),
            ...(filters.search && { search: filters.search }),
            ...(filters.date && { date: filters.date }),
            ...(filters.status && { status: filters.status }),
        }
        const response = await axios.get("/api/orders/get-orders", {
            params,
            paramsSerializer: params => {
                return new URLSearchParams(params).toString()
            },
        })

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchOrderDetail = createAsyncThunk("orders/fetchOrderDetail", async (orderId, { rejectWithValue }) => {
    try {
        // console.log("====================================")
        // console.log("Order ID:", orderId)
        // console.log("====================================")
        const response = await axios.get(`/api/orders/get-detail/${orderId}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchInvoiceOrder = createAsyncThunk("orders/fetchInvoiceOrder", async orderId => {
    try {
        const response = await axios.get(`/api/orders/invoice/get-invoices-by-order/${orderId}`)
        // console.log("====================================")
        // console.log("Order ID:", response.data.data)
        // console.log("====================================")
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const createPayment = createAsyncThunk("orders/createPayment", async (data, { rejectWithValue }) => {
    try {
        // console.log("====================================")
        // console.log("Data:", data)
        // console.log("====================================")
        const response = await axios.post("/api/orders/invoice/create-payment", data)
        // console.log("====================================")
        // console.log("Response:", response.data)
        // console.log("====================================")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const setInvoiceAmount = createAsyncThunk("orders/setInvoiceAmount", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.patch("/api/orders/invoice/set-invoice-amount", data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getMyInvoice = createAsyncThunk("orders/getMyInvoice", async orderId => {
    try {
        const response = await axios.get(`/api/orders/invoice/get-my-invoice-by-order/${orderId}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const createReview = createAsyncThunk("orders/createReview", async ({ formData, orderId }, { rejectWithValue }) => {
    try {
        // console.log("====================================")
        // console.log("Data being sent:", formData)
        // console.log("Order ID:", orderId)
        // console.log("====================================")

        const response = await axios.post(
            `/api/orders/review/${orderId}`, // orderId used here in the URL
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        )

        return response.data
    } catch (error) {
        console.error("Error in createReview:", error.response)
        return rejectWithValue(error.response?.data || "Something went wrong")
    }
})

export const getBudgets = createAsyncThunk("orders/getBudgets", async () => {
    try {
        const response = await axios.get("/api/general/wholesale-form/budget")
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const createWholesale = createAsyncThunk("orders/createWholesale", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/general/wholesale-form/send", data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const completeOrder = createAsyncThunk("orders/completeOrder", async (orderId, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/orders/complete/${orderId}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPickupInformation.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getPickupInformation.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.information = action.payload.data
                state.isLoading = false
            })
            .addCase(getPickupInformation.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchPaymentMethod.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchPaymentMethod.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.paymentMethod = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchPaymentMethod.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchOrders.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                // console.log("Action in fulfilled order:", action)
                // console.log("Current state:", state)
                state.orders = action.payload.data
                state.totalPages = action.payload?.meta?.last_page
                state.currentPage = action.payload?.meta?.current_page
                state.isLoading = false
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchOrderDetail.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchOrderDetail.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.orderDetail = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchOrderDetail.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(fetchInvoiceOrder.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchInvoiceOrder.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.invoiceOrders = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchInvoiceOrder.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(createPayment.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.afterCreatePayment = action.payload.data
                state.isLoading = false
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(setInvoiceAmount.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(setInvoiceAmount.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.afterSetInvoiceAmount = action.payload.data
                state.isLoading = false
            })
            .addCase(setInvoiceAmount.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(getMyInvoice.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getMyInvoice.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.myInvoice = action.payload.data
                state.isLoading = false
            })
            .addCase(getMyInvoice.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(createReview.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createReview.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.isLoading = false
            })
            .addCase(createReview.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(getBudgets.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getBudgets.fulfilled, (state, action) => {
                // console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.budgets = action.payload.data
                state.isLoading = false
            })
            .addCase(getBudgets.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(createWholesale.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createWholesale.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.isLoading = false
            })
            .addCase(createWholesale.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
            .addCase(completeOrder.pending, (state, action) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(completeOrder.fulfilled, (state, action) => {
                console.log("Action in fulfilled:", action)
                // console.log("Current state:", state)
                state.isLoading = false
            })
            .addCase(completeOrder.rejected, (state, action) => {
                state.error = action.error.message
                state.isLoading = false
            })
    },
})

export const { setStateProduct, setProductName, initializeProduct } = orderSlice.actions
export default orderSlice.reducer
