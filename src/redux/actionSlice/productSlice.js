import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        productDetail: {},
    },
    reducers: {
        //actions
        openProductDetails: (state, action) => {
            state.productDetail = action.payload
        },
       
    }
})

export const { openProductDetails } = productSlice.actions;
export default productSlice.reducer;