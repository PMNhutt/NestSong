import React from 'react'
import CartItem from './components/CartItem'
import { setShowModalCart } from '../../../../redux/actionSlice/shoppingCartSlice'

//** Third party components*/
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'

const ModalShoppingCart = (props) => {
    const itemList = props?.shoppingCart
    const dispatch = useDispatch()

    const totalItemInCart = () => {
        let total = 0;
        if (itemList?.length > 0) {
            itemList.forEach(item => {
                total += item.amount
            })
        }
        return total
    }
    const totalItem = totalItemInCart()

    return (
        <div className='font-maven max-w-[300px] w-[300px] absolute z-40 bg-white rounded-[5px]
        overflow-hidden top-[0px] border shadow-md text-black left-[-500%] p-[15px]'>
            <div>
                <div className=' border-solid border-b-[1px] pb-2 flex items-center justify-between'>
                    <p className='text-[16px] font-semibold uppercase'>Giỏ hàng</p>
                    <p className='text-[16px]'>{totalItem} sản phẩm</p>
                </div>
                <div className='max-h-[290px] scroll-bar overflow-x-hidden overflow-y-scroll py-[15px]'>
                    {itemList?.map((item) => (
                        <div key={item?.id} className='border-t border-dashed first:border-t-0'>
                            <CartItem item={item} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='pt-[20px]'>
                <Link to='/cart' onClick={() => dispatch(setShowModalCart(false))}>
                    <div className='text-white rounded-[5px] bg-primary py-[10px] text-center cursor-pointer text-[18px]'>Xem tất cả</div>
                </Link>
            </div>
        </div>
    )
}

export default ModalShoppingCart