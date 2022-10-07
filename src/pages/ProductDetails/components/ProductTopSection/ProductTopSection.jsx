import React from 'react'
import ProductSlider from './components/ProductSlider'
import ProductVariants from './components/ProductVariants'

const ProductTopSection = () => {
  return (
    <div className='flex gap-[60px] md:flex-row flex-col border shadow-lg rounded-[5px] py-3 px-5 my-8'>
        <ProductSlider />
        <ProductVariants />
    </div>
  )
}

export default ProductTopSection