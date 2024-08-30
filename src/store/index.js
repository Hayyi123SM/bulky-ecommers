import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./slices/productSlice"
import bannerReducer from "./slices/bannerSlice"
import videoReducer from "./slices/videoSlice"
import cartSlice from "./slices/cartSlice"
import authSlice from "./slices/authSlice"
import filterSlice from "./slices/filterSlice"
import orderSlice from "./slices/orderSlice"
import areaSlice from "./slices/areaSlice"
import addressSlice from "./slices/addressSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productReducer,
        banners: bannerReducer,
        videos: videoReducer,
        carts: cartSlice,
        filters: filterSlice,
        orders: orderSlice,
        area: areaSlice,
        address: addressSlice,
    },
})
