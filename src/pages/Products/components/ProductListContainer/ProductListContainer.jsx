import { useState } from 'react'
import SortComponent from './components/SortComponent'
import ProductGrid from './components/ProductGrid'

const ProductListContainer = () => {

    return (
        <div className='font-maven text-black mt-20 md:pr-16 pr-6 md:pl-16 pl-6'>
            <SortComponent />
            <ProductGrid />
        </div>
    )
}

export default ProductListContainer