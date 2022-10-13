import React from 'react'
import Item from './components/Item'

//** icons **/
import { icBox } from '../../../../assets/images'

//**Third party components*/
import { useSelector } from 'react-redux'

const OrderItem = () => {

    //** Const */
    const shoppingCart = useSelector((state) => state.cart?.shoppingCart)

    return (
        <div className='text-black border rounded-[5px] shadow-md px-6 py-2 h-fit mb-3'>
            <div className='pb-3 mb-5 border-b flex items-center gap-2'>
                <div className='w-[25px] h-[25px] bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${icBox})` }} />
                <p className='font-semibold uppercase text-[20px]'>thông tin đơn hàng</p>
            </div>
            <div className='max-h-[290px] scroll-bar overflow-x-hidden overflow-y-scroll'>
                {shoppingCart?.map((item) => (
                    <div key={item?.id} className='border-t border-dashed first:border-t-0'>
                        <Item item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderItem