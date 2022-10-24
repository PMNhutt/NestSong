import React from 'react'
import { product, starts, saleTag, border, blueBorder, redBorder } from '../../assets/images'
import truncate from '../../utils/truncate'
import numberWithComma from '../../utils/numberWithComma'
import { openProductDetails, clearProductDetail } from '../../redux/actionSlice/productSlice'
import instances from '../../utils/plugin/axios'

//** Third party libraries */
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

const Product = (props) => {

  //** States
  const dispatch = useDispatch()

  //** handle Open detail 
  const handleOpenDetail = async () => {
    dispatch(clearProductDetail(true))
    const res = await instances.get(`/products/id/${props?.data?.categoryId}/${props?.data?.productId}`, {
      params: {
        productId: props?.data?.productId,
        categoryId: props?.data?.categoryId
      }
    })
    dispatch(openProductDetails(res?.data))
    dispatch(clearProductDetail(false))
  }

  return (
    <Link to={'/products/detail/' + props?.data?.productName} onClick={handleOpenDetail}>
      <div className='w-fit h-fit px-3 py-5 cursor-pointer hover:shadow-lg flex flex-col items-center rounded-[5px] font-maven relative'>
        <div className='w-[60px] h-[60px] absolute right-3 bg-contain bg-no-repeat z-10' style={{ backgroundImage: `url(${saleTag})` }}>
          <p className='text-white absolute right-5 text-[17px] font-bold'>{Math.round(props?.data?.discount)}%</p>
          <p className='text-white absolute right-5 top-5 text-[17px] font-semibold'>OFF</p>
        </div>
        <div className='w-[230px] h-[230px] bg-cover bg-center bg-no-repeat relative' 
        // style={{ backgroundImage: `url(${props?.data?.image || product})` }}
        >
          <img loading='lazy' className='w-[230px] h-[230px] object-cover' src={`data:image/webp;base64,${props?.data?.image || ''}`} />
          <div className='w-[230px] h-[150px] bg-cover bg-center bottom-0 absolute z-10' style={{ backgroundImage: `url(${border})` }} />
        </div>
        <div className='w-[230px]'>
          <p className='font-semibold text-[20px] leading-[24px] mt-3'>{truncate(props?.data?.productName, 40)}</p>
          <div className='flex items-center gap-5'>
            <Rating defaultValue={props?.data?.rating} readOnly precision={0.5} size="small" />
            <p>Đã bán <span>{props?.data?.soldQuantity}</span></p>
          </div>
          <div className='flex items-center gap-3'>
            <p className='text-[20px] text-redError font-medium'>{numberWithComma(props?.data?.salePrice)}đ </p>
            <p className='line-through text-[13px] text-gray-400'>{numberWithComma(props?.data?.originalPrice)}đ </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product