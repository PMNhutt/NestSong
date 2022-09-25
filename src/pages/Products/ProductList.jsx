import { useEffect } from 'react'
import { Banner } from '../../share/components'
import Filter from './components/Filter/Filter'
import ProductListContainer from './components/ProductListContainer/ProductListContainer'

// ** Images
import { productListBanner } from '../../assets/images'

// ** data
const data = {
    category: [
        { id: 1, name: 'Tổ yến thô', value: 'yen-tho' },
        { id: 2, name: 'Tổ yến tinh chế', value: 'yen-tinh-che' },
        { id: 3, name: 'Yến hũ chưng tươi', value: 'yen-hu-tuoi' },
        { id: 4, name: 'Yến hũ chưng sẵn', value: 'yen-hu-chung-san' },
    ]
}

const ProductList = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <div>
            <Banner img={productListBanner} />
            <div className='flex md:flex-row flex-col gap-[50px]'>
                <div className='md:w-[20%] w-full'>
                    <Filter filter={data.category} />
                </div>
                <div className='md:w-[80%] w-full'>
                    <ProductListContainer />
                </div>
            </div>
        </div>
    )
}

export default ProductList