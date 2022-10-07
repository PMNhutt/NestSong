import React from 'react'
import { Heading } from '../../../../share/components'
import CustomerReview from './components/CustomerReview'

const ProductBottomSection = () => {
  return (
    <div className='border shadow-lg rounded-[5px] py-3 px-5 my-8'>
      <Heading text='Đánh giá sản phẩm'/>
      <CustomerReview />
    </div>
  )
}

export default ProductBottomSection