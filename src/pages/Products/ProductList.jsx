import { useEffect } from 'react'
import { Banner } from '../../share/components'

// ** Images
import { productListBanner } from '../../assets/images'

const ProductList = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])
    return (
        <div>
            <Banner img={productListBanner} />
        </div>
    )
}

export default ProductList