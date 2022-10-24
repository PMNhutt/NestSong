import React from 'react'
import { product } from '../../../../../assets/images'
import truncate from '../../../../../utils/truncate'
import numberWithComma from '../../../../../utils/numberWithComma'
import { removeWholeItem, getShoppingCart } from '../../../../../redux/actionSlice/shoppingCartSlice'

//** Third party components*/
import { useDispatch, useSelector } from 'react-redux'

const CartItem = (props) => {
    //** Const */
    const dispatch = useDispatch()

    const handleRemoveItem = (id) => {
        dispatch(removeWholeItem(id))
        dispatch(getShoppingCart())
    }

    return (
        <div className='font-maven flex gap-4 py-5'>
            <div className='bg-white w-[80px] h-[80px] bg-cover bg-no-repeat bg-center'
            // style={{ backgroundImage: `url(${props?.item?.image ? props?.item.image : product})` }}
            >
                <img loading='lazy' className='w-[80px] h-[80px] object-cover' src={`data:image/webp;base64,${props?.item?.ImgSrc || ''}`} />
            </div>
            <div className='flex-1 relative'>
                <p onClick={() => handleRemoveItem(props?.item.id)} className='cursor-pointer p-1 text-redError absolute top-[-5px] right-0 text-[15px] font-semibold'>X</p>
                <p className='max-w-[85%] text-[18px] font-semibold leading-[1.2]'>
                    {props?.item?.name ? truncate(props?.item.name, 29) : truncate('Yến sào thượng hạng số 1 ngon tuyệt vời bá cháy con bọ chét', 29)}
                </p>
                <p className='text-[14px] my-1 text-gray-500'>Loại: {props?.item?.categoryName ? props?.item?.categoryName : '50kg'}</p>
                <div className='flex items-center justify-between mt-1 text-primary'>
                    <p className='text-[14px] font-semibold'>{props?.item?.price ? `${numberWithComma(props?.item?.price)}đ` : `${numberWithComma(200000)}đ`}</p>
                    <p className='text-[14px] font-semibold'>{`x${props?.item?.amount ? props?.item?.amount : 3}`}</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem