import React from 'react'
import numberWithCommas from '../../../../utils/numberWithComma'

//** Third party components*/
import { useDispatch, useSelector } from 'react-redux'

const PurchaseSection = () => {
    //** Const */
    const cartList = useSelector((state) => state.cart.shoppingCart)

    //** handle total item */
    const totalItemInCart = () => {
        let total = 0;
        let totalPrice = 0
        let totalItem = 0
        if (cartList?.length > 0) {
            totalItem = cartList?.length
            cartList.forEach(item => {
                total += item.amount
                totalPrice += (item.amount * item.price)
            })
        }
        return { total, totalPrice, totalItem }
    }
    const totalItem = totalItemInCart()

    return (
        <div className='sticky top-[100px] mb-10'>
            <div className='text-black border rounded-[5px] shadow-md  px-6 py-2 h-fit'>
                <div className='pb-2 mb-5 border-b flex items-center justify-between'>
                    <p className='font-semibold'>Đơn hàng</p>
                    <p className=''>{totalItem?.totalItem} sản phẩm</p>
                </div>
                <div className='flex justify-between mb-4'>
                    <p className='text-primary font-medium text-[18px]'>Tổng tiền</p>
                    <p className='text-[18px] text-primary font-medium'>{numberWithCommas(totalItem?.totalPrice)} đ</p>
                </div>
            </div>
            <div className={`uppercase text-white font-semibold mt-5 w-full text-center py-2 rounded-[5px]
            ${cartList?.length > 0 ? 'cursor-pointer bg-primary' : 'cursor-not-allowed bg-blue-200'}`}>Thanh toán ngay</div>

        </div>
    )
}

export default PurchaseSection