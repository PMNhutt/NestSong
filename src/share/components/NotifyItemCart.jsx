import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const NotifyItemCart = (props) => {
    const cartStore = useSelector((state) => state.cart)

    //** handle get total item in cart
    const totalShoppingCartItems = () => {
        let totalItem = 0;
        if (props.shoppingCart?.length > 0) {
            props.shoppingCart.forEach((item) => {
                totalItem += +item.amount
            })
        }
        return totalItem
    }
    const totalItem = totalShoppingCartItems()
    return (
        <>
            {totalItem > 0 &&
                <div className='w-[20px] h-[20px] rounded-full bg-primary absolute top-[12px] right-[-5px] text-white flex items-center justify-center'>
                    <p className='text-[13px] text-center'>{totalItem}</p>
                </div>
            }
        </>
    )
}

export default NotifyItemCart