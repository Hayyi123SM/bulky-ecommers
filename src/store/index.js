import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import productReducer from "./slices/productSlice"
import bannerReducer from "./slices/bannerSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        banners: bannerReducer,
    },
})
