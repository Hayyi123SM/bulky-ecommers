import { configureStore } from "@reduxjs/toolkit"
import productReducer, { productApi } from "./slices/productSlice"
import bannerReducer from "./slices/bannerSlice"
import videoReducer from "./slices/videoSlice"
import cartSlice from "./slices/cartSlice"
import authSlice from "./slices/authSlice"
import filterSlice from "./slices/filterSlice"
import orderSlice from "./slices/orderSlice"
import areaSlice from "./slices/areaSlice"
import addressSlice from "./slices/addressSlice"
import testimonySlice from "./slices/testimonySlice"
import pageSlice from "./slices/pageSlice"
import { apiWithTokenSlice } from "@/store/slices/apiWithTokenSlice"

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        auth: authSlice,
        products: productReducer,
        banners: bannerReducer,
        videos: videoReducer,
        carts: cartSlice,
        filters: filterSlice,
        orders: orderSlice,
        area: areaSlice,
        address: addressSlice,
        testimony: testimonySlice,
        pages: pageSlice,
        [apiWithTokenSlice.reducerPath]: apiWithTokenSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(apiWithTokenSlice.middleware),
})
