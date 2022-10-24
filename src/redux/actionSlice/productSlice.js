import { createSlice } from "@reduxjs/toolkit";
import instances from "../../utils/plugin/axios";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        productDetail: {},
        productList: undefined,
        loading: true
    },
    reducers: {
        //actions
        openProductDetails: (state, action) => {
            state.productDetail = action.payload
            localStorage.setItem('PRODUCT_DETAIL', JSON.stringify(state.productDetail))
        },
        setProductList: (state, action) => {
            state.productList = action.payload
        },
        getProductDetail: (state) => {
            state.productDetail = JSON.parse(localStorage.getItem('PRODUCT_DETAIL'))
            let currentDetail = JSON.parse(localStorage.getItem('PRODUCT_DETAIL'))

            if (!currentDetail) {
                state.productDetail = currentDetail
            }
        },
        clearProductDetail: (state, action) => {
            state.loading = action.payload
        },
    }
})

export const { openProductDetails, setProductList, getProductDetail, clearProductDetail } = productSlice.actions;
export default productSlice.reducer;