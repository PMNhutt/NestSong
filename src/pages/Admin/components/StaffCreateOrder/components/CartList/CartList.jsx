import React from 'react'
import Item from './Item'
import {useSelector} from 'react-redux'

const CartList = (props) => {
    const cartList = useSelector((state) => state.management.cartList)
    return (
        <div className='text-black font-maven rounded shadow-md p-5 bg-white'>
            <div className='max-h-[250px] scroll-bar overflow-x-hidden overflow-y-scroll'>
                {
                    cartList?.length > 0 ?
                    cartList?.map((item) => (
                        <div key={item?.id} className='border-t border-dashed first:border-t-0'>
                            <Item item={item} />
                        </div>
                    ))
                    : 
                    <div>
                        <p>Chưa có sản phẩm nào được thêm</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default CartList