import { useState, useEffect } from 'react'
import SortComponent from './components/SortComponent'
import ProductGrid from './components/ProductGrid'
import instances from '../../../../utils/plugin/axios'
import { setProductList } from '../../../../redux/actionSlice/productSlice'

//** Third party components*/
import { useDispatch } from 'react-redux'

const ProductListContainer = (props) => {

    return (
        <div className='font-maven text-black sm:mt-20 mt-3 md:pr-16 pr-6 md:pl-16 pl-6'>
            <SortComponent
                setSize={props?.setSize}
                setSort={props?.setSort}
            />
            <ProductGrid
                page={props?.page}
                setPage={props?.setPage}
            />
        </div>
    )
}

export default ProductListContainer