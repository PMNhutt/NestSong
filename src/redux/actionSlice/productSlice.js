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
        getProductDetail: (state, action) => {
            let currentDetail = JSON.parse(localStorage.getItem('PRODUCT_DETAIL'))
            state.productDetail = currentDetail

            if (!currentDetail) {
                state.productDetail = currentDetail
            }
        },
        clearProductDetail: (state, action) => {
            state.loading = action.payload
        },
        deleteProductDetail: (state) => {
            let currentDetail = JSON.parse(localStorage.getItem('PRODUCT_DETAIL'))
            if (currentDetail) {
                localStorage.removeItem('PRODUCT_DETAIL')
            }
        }
    }
})

export const { openProductDetails, setProductList, getProductDetail, clearProductDetail,
    deleteProductDetail } = productSlice.actions;
export default productSlice.reducer;