import React from 'react'

//** images **
import { product } from '../../../../../assets/images'
import numberWithCommas from '../../../../../utils/numberWithComma'
import truncate from '../../../../../utils/truncate'

const Item = (props) => {
    return (
        <div className='font-maven flex gap-4 py-5'>
            <div className='bg-white w-[80px] h-[80px] bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${props?.item?.image ? props?.item.image : product})` }} />
            <div className='flex-1 relative'>
                <p className='max-w-[85%] text-[18px] font-semibold leading-[1.2]'>
                    {props?.item?.name ? truncate(props?.item.name, 29) : truncate('Yến sào thượng hạng số 1 ngon tuyệt vời bá cháy con bọ chét', 29)}
                </p>
                <p className='text-[14px] my-1 text-gray-500'>Loại: {props?.item?.categoryName ? props?.item?.categoryName : '50kg'}</p>
                <div className='flex items-center gap-3 mt-1 text-primary'>
                    <p className='text-[16px] font-semibold'>{props?.item?.price ? `${numberWithCommas(props?.item?.price)}đ` : `${numberWithComma(200000)}đ`}</p>
                    <p className='text-[16px] font-semibold'>{`x${props?.item?.amount ? props?.item?.amount : 3}`}</p>
                </div>
            </div>
        </div>
    )
}

export default Item