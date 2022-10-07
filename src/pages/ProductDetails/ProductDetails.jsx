import { useEffect } from 'react'
import ProductTopSection from './components/ProductTopSection/ProductTopSection'
import ProductMidSection from './components/ProductMidSection/ProductMidSection'
import ProductBottomSection from './components/ProductBottomSection/ProductBottomSection'
import RecommendSection from './components/RecommendSection/RecommendSection'

//** Third party library*/
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'

//** images */
import { footer } from '../../assets/images'

const ProductDetails = () => {

    //** const & states */
    const params = useParams();

    useEffect(() => {
        document.title = params.name;
    }, [params.name])

    return (
        <div className='text-black '>
            <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})`}} />
            <div className='sm:px-16 px-6 mb-20'>
                <ProductTopSection />
                <ProductMidSection />
                <ProductBottomSection />
                <RecommendSection />
            </div>
        </div>
    )
}

export default ProductDetails