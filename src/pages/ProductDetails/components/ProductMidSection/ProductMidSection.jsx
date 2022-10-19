import React from 'react'
import { Heading } from '../../../../share/components'

import { product, productBig } from '../../../../assets/images'

//** third party libraries */
import { useDispatch, useSelector } from 'react-redux';

const ProductMidSection = () => {

  //** Const */
  const productDescription = useSelector((state) => state.product.productDetail.productDetail)

  return (
    <div className='border shadow-lg rounded-[5px] py-3 px-5 my-8'>
      <Heading text='Chi tiết sản phẩm'/>
      <p className='w-[60%]'>{productDescription?.description}</p>

      <img src={productBig} className='py-5'/>
    </div>
  )
}

export default ProductMidSection