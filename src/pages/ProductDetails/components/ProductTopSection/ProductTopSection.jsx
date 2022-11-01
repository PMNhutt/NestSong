import React from 'react'
import ProductSlider from './components/ProductSlider'
import ProductVariants from './components/ProductVariants'

const ProductTopSection = (props) => {
  return (
    <div className='flex gap-[60px] md:flex-row flex-col border shadow-lg rounded-[5px] py-3 px-5 my-8'>
      <ProductSlider productMedia={props?.detailData?.productMedia} />
      <ProductVariants
        productDetail={props?.detailData?.productDetail}
        listAgencies={props?.detailData?.listAgencies}
      />
    </div>
  )
}

export default ProductTopSection