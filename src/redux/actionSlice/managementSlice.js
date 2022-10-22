import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const notify = (name, value) => toast.success(`Đã thêm ${value} ${name} vào đơn hàng`, {
    pauseOnHover: false,
});
const notifyError = () => toast.error("Có lỗi xảy ra !", {
    pauseOnHover: false,
});
const notifyWarn = (value, valueLeft) => toast.warn(`Bạn đã thêm ${value} sản phẩm này! Số lượng còn lại có thể thêm: ${valueLeft}`, {
    pauseOnHover: false,
});

export const managementSlice = createSlice({
    name: 'management',
    initialState: {
        cartList: [],
        addedProduct: {
            id: 0,
            amountAdded: 0,
        },
        adminProductList: [],
        adminStaffList: [],
    },
    reducers: {
        addItemToCart: (state, action) => {
            let added = state.cartList.find((product) => {
                return product.id === action.payload.id
            })

            let addedAmount = 0
            let checkValidAmount = true
            if (action.payload.id === state.addedProduct.id) {
                addedAmount = state.addedProduct.amountAdded
                if (action.payload.inputValue + addedAmount > action.payload.stock) {
                    checkValidAmount = false
                } else {
                    checkValidAmount = true
                }
            }

            if (checkValidAmount) {
                if (action.payload.inputValue >= 1) {
                    // state.cartEmpty = false
                    notify(action.payload.name, action.payload.inputValue)
                    if (added === undefined) {
                        state.cartList = [...state.cartList, {
                            id: action.payload.id,
                            name: action.payload.name,
                            ImgSrc: action.payload?.thumbImg,
                            price: action.payload.price,
                            amount: action.payload.inputValue,
                            maxAmount: action.payload.stock,
                            categoryName: action.payload.categoryName
                        }]
                        // localStorage.setItem('SHOPPING_CART', JSON.stringify(state.cartList))
                    } else {
                        let newAmount = 0
                        let addedPosition = state.cartList.indexOf(added)
                        state.cartList.map((pro, index) => {
                            if (pro.id === added.id) {
                                newAmount = pro.amount + action.payload.inputValue
                                state.cartList.splice(addedPosition, 1)
                                state.cartList.splice(addedPosition, 0, {
                                    id: action.payload.id,
                                    name: action.payload.name,
                                    ImgSrc: action.payload?.thumbImg,
                                    price: action.payload.price,
                                    amount: newAmount,
                                    maxAmount: action.payload.stock,
                                    categoryName: action.payload.categoryName
                                })
                            }
                        })
                        // localStorage.setItem('SHOPPING_CART', JSON.stringify(state.cartList))
                    }
                } else {
                    notifyError()
                }
            } else {
                notifyWarn(parseInt(addedAmount), action.payload.stock - parseInt(addedAmount))
                // state.stockAvailablePeek = true
            }
        },
        setAddedProduct: (state, action) => {
            state.addedProduct = action.payload
        },
        removeCart: (state) => {
            state.cartList = []
            state.addedProduct = {
                id: 0,
                amountAdded: 0,
            }
        },
        removeWholeItem: (state, action) => {
            // let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            if (state.cartList?.length > 0) {
                let added = state.cartList.find((product) => {
                    return product.id === action.payload
                })
                state.cartList.map((pro, index) => {
                    if (pro.id === added.id) {
                        state.cartList.splice(index, 1)
                        state.cartList = [...state.cartList]
                        // localStorage.setItem('SHOPPING_CART', JSON.stringify(state.cartList))
                    }
                })
            }
        },
        deleteItem: (state, action) => {
            let newAmount = 0
            let added = state.cartList.find((product) => {
                return product.id === action.payload.id
            })
            let addedPosition = state.cartList.indexOf(added)
            state.cartList.map((pro, index) => {
                if (pro.id === added.id) {
                    if (pro.amount > 1) {
                        newAmount = pro.amount - 1
                        state.cartList.splice(addedPosition, 1)
                        state.cartList.splice(addedPosition, 0, {
                            id: pro.id,
                            name: pro.name,
                            ImgSrc: pro.ImgSrc,
                            price: pro.price,
                            amount: newAmount,
                            maxAmount: pro.maxAmount,
                            categoryName: pro.categoryName
                        })
                        // localStorage.setItem('SHOPPING_CART', JSON.stringify(state.cartList))
                    }
                }
            })
        },
        setAdminProductList: (state, action) => {
            state.adminProductList = action.payload
        },
        setAdminStaffList: (state, action) => {
            state.adminStaffList = action.payload
        },
    }
})

export const { setAddedProduct, addItemToCart, removeCart, removeWholeItem, deleteItem,
    setAdminProductList, setAdminStaffList } = managementSlice.actions;

export default managementSlice.reducer;