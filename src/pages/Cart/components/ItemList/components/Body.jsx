import React from 'react'
import emptyCart from '../../../../../share/lottie/emptyCart.json'
import { Button } from '../../../../../share/components'
import { getShoppingCart } from '../../../../../redux/actionSlice/shoppingCartSlice'
import ItemBody from './ItemBody'

//** Third party components*/
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Body = () => {

    //** Const */
    const dispatch = useDispatch()
    const cartList = useSelector((state) => state.cart.shoppingCart)
    // console.log(cartList);

    return (
        <div className='border rounded-[5px] shadow-md px-6 py-2 mb-5'>
            {cartList?.length > 0
                ?
                <div>
                    {cartList?.map((item) => (
                        <div key={item.id} className='border-t border-gray-400 border-dashed first:border-t-0'>
                            <ItemBody item={item}/>
                        </div>
                    ))}
                </div>
                :
                <div className='py-5 flex flex-col items-center'>
                    <Lottie
                        animationData={emptyCart}
                        loop={true}
                        controls={false}
                        className="h-[30vh]"
                    />
                    <p className='mt-5 text-center text-gray-500 font-semibold'>Giỏ hàng của bạn đang rỗng</p>
                    <Link to='/products'>
                        <Button styles='bg-primary rounded-[5px] w-fit mt-5'>Mua thêm</Button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Body