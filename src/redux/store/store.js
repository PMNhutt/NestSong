import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../actionSlice/shoppingCartSlice';
import productReducer from '../actionSlice/productSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
    }
})

export default store;