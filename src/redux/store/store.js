import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../actionSlice/shoppingCartSlice';
import productReducer from '../actionSlice/productSlice'
import accountReducer from '../actionSlice/accountSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        account: accountReducer,
    }
})

export default store;