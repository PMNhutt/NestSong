import React from 'react'
import { product, starts, saleTag, border, blueBorder,redBorder } from '../../assets/images'
import truncate from '../../utils/truncate'
import numberWithComma from '../../utils/numberWithComma'

//** Third party libraries */
import Rating from '@mui/material/Rating';

const Product = (props) => {
  return (
    <div className='w-fit h-fit px-3 py-5 cursor-pointer hover:shadow-lg flex flex-col items-center rounded-[5px] font-maven relative'>
      <div className='w-[60px] h-[60px] absolute right-3 bg-contain bg-no-repeat z-10' style={{ backgroundImage: `url(${saleTag})` }}>
        <p className='text-white absolute right-5 text-[17px] font-bold'>{props?.data.discount}%</p>
        <p className='text-white absolute right-5 top-5 text-[17px] font-semibold'>OFF</p>
      </div>
      <div className='w-[230px] h-[230px] bg-contain  bg-no-repeat relative' style={{ backgroundImage: `url(${product})` }}>
        <div className='w-[230px] h-[150px] bg-cover bg-center bottom-0 absolute z-10' style={{ backgroundImage: `url(${border})` }} />
      </div>
      <div className='w-[230px]'>
        <p className='font-semibold text-[20px] leading-[24px] mt-3'>{truncate(props?.data.name, 40)}</p>
        <div className='flex items-center gap-5'>
          <Rating defaultValue={props?.data.star_value} precision={0.5} size="small"/>
          <p>Đã bán <span>{props?.data.sold}</span></p>
        </div>
        <div className='flex items-center gap-3'>
          <p className='text-[20px] text-redError font-medium'>{numberWithComma(props?.data.price)}đ </p>
          <p className='line-through text-[13px] text-gray-400'>{numberWithComma(props?.data.off_price)}đ </p>
        </div>
      </div>
    </div>
  )
}

export default Product