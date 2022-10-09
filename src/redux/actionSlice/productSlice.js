import { createSlice } from "@reduxjs/toolkit";
import instances from "../../utils/plugin/axios";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        productDetail: {},
        productList: undefined
    },
    reducers: {
        //actions
        openProductDetails: (state, action) => {
            state.productDetail = action.payload
        },
        setProductList: (state, action) => {
            state.productList = action.payload
        }
       
    }
})

export const { openProductDetails, setProductList } = productSlice.actions;
export default productSlice.reducer;