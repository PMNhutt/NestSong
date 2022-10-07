import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const notify = (name, value) => toast.success(`Đã thêm ${value} ${name} vào giỏ hàng`, {
    pauseOnHover: false,
});
const notifyError = () => toast.error("Có lỗi xảy ra !", {
    pauseOnHover: false,
});
const notifyWarn = (value, valueLeft) => toast.warn(`Bạn đã thêm ${value} sản phẩm này! Số lượng còn lại có thể thêm: ${valueLeft}`, {
    pauseOnHover: false,
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        productslist: [],
        cartEmpty: true,
        stockAvailable: {
            isAvailable: true,
            productID: 0,
        },
        stockAvailablePeek: false,
        cartPosition: {},
        addedProduct: {
            id: 0,
            amountAdded: 0,
        },
        shoppingCart: [],
        showModal: false,
    },
    reducers: {
        //actions
        addItem: (state, action) => {
            state.cartEmpty = false

            let added = state.productslist.find((product) => {
                return product.id === action.payload.id
            })
            let addedAmount = 0
            let checkValidAmount = true

            if (action.payload.id === state.addedProduct.id) {
                addedAmount = state.addedProduct.amountAdded

                if (addedAmount >= action.payload.stock) {
                    checkValidAmount = false
                } else {
                    checkValidAmount = true
                }
            }

            if (checkValidAmount) {
                state.stockAvailable.isAvailable = true
                if (added === undefined) {
                    state.productslist.push(action.payload.product)
                } else {
                    let newAmount = 0
                    state.productslist.map((pro, index) => {
                        if (pro.id === added.id) {
                            newAmount = pro.amount + 1
                            state.productslist.splice(index, 1)
                        }
                    })
                    state.productslist = [...state.productslist, {
                        id: action.payload.id,
                        name: action.payload.name,
                        ImgSrc: action.payload.ImgSrc,
                        price: action.payload.price,
                        amount: newAmount,
                        maxAmount: action.payload.stock,
                    }]
                }
            } else {
                notifyWarn()
                state.stockAvailable.isAvailable = false
            }

        },
        addItemFromPeek: (state, action) => {
            let added = state.productslist.find((product) => {
                return product.id === action.payload.id
            })

            let addedAmount = 0
            let checkValidAmount = true
            if (action.payload.id === state.addedProduct.id) {
                addedAmount = state.addedProduct.amountAdded
                console.log('added amount: ' + addedAmount + ' ' + 'inputValue' + action.payload.inputValue);
                if (action.payload.inputValue + addedAmount > action.payload.stock) {
                    checkValidAmount = false
                } else {
                    checkValidAmount = true
                }
            }

            if (checkValidAmount) {
                if (action.payload.inputValue >= 1) {
                    state.cartEmpty = false
                    notify(action.payload.name, action.payload.inputValue)
                    if (added === undefined) {
                        state.productslist = [...state.productslist, {
                            id: action.payload.id,
                            name: action.payload.name,
                            ImgSrc: action.payload?.thumbImg,
                            price: action.payload.price,
                            amount: action.payload.inputValue,
                            maxAmount: action.payload.stock,
                        }]
                        localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
                    } else {
                        let newAmount = 0
                        let addedPosition = state.productslist.indexOf(added)
                        state.productslist.map((pro, index) => {
                            if (pro.id === added.id) {
                                newAmount = pro.amount + action.payload.inputValue
                                state.productslist.splice(addedPosition, 1)
                                state.productslist.splice(addedPosition, 0, {
                                    id: action.payload.id,
                                    name: action.payload.name,
                                    ImgSrc: action.payload?.thumbImg,
                                    price: action.payload.price,
                                    amount: newAmount,
                                    maxAmount: action.payload.stock,
                                })
                            }
                        })
                        localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
                    }
                } else {
                    notifyError()
                }
            } else {
                notifyWarn(parseInt(addedAmount), action.payload.stock - parseInt(addedAmount))
                state.stockAvailablePeek = true
            }
        },
        deleteItem: (state, action) => {
            let newAmount = 0
            let added = state.productslist.find((product) => {
                return product.id === action.payload.id
            })
            let addedPosition = state.productslist.indexOf(added)
            state.productslist.map((pro, index) => {
                if (pro.id === added.id) {
                    if (pro.amount > 1) {
                        newAmount = pro.amount - 1
                        state.productslist.splice(addedPosition, 1)
                        state.productslist.splice(addedPosition, 0, {
                            id: pro.id,
                            name: pro.name,
                            ImgSrc: pro.ImgSrc,
                            price: pro.price,
                            amount: newAmount,
                            maxAmount: pro.maxAmount,
                        })
                        localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
                    }
                }
            })
        },
        cartEmpty: (state, action) => {
            state.cartEmpty = action.payload
        },
        setStockAvailable: (state, action) => {
            state.stockAvailable.isAvailable = action.payload.isAvailable
            state.stockAvailable.productID = action.payload.productID
        },
        setStockAvailablePeek: (state, action) => {
            state.stockAvailablePeek = action.payload
        },
        setAddedProduct: (state, action) => {
            state.addedProduct = action.payload
        },
        setCartPosition: (state, action) => {
            state.cartPosition = action.payload
        },
        getShoppingCart: (state, action) => {
            state.shoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))

            if (currentShoppingCart?.length > 0) {
                state.productslist = currentShoppingCart
            }
        },
        removeWholeItem: (state, action) => {
            let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            if (currentShoppingCart?.length > 0) {
                let added = state.productslist.find((product) => {
                    return product.id === action.payload
                })
                state.productslist.map((pro, index) => {
                    if (pro.id === added.id) {
                        state.productslist.splice(index, 1)
                        state.productslist = [...state.productslist]
                        localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
                    }
                })
            }
        },
        setShowModalCart: (state, action) => {
            state.showModal = action.payload
        }
    }
})

export const { addItem, addItemFromPeek, deleteItem,
    cartEmpty, setStockAvailable, setStockAvailablePeek,
    setAddedProduct, setCartPosition, getShoppingCart,
    removeWholeItem, setShowModalCart } = cartSlice.actions;
export default cartSlice.reducer;

