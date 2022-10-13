import { useEffect, useState } from 'react'
import ProductTopSection from './components/ProductTopSection/ProductTopSection'
import ProductMidSection from './components/ProductMidSection/ProductMidSection'
import ProductBottomSection from './components/ProductBottomSection/ProductBottomSection'
import RecommendSection from './components/RecommendSection/RecommendSection'
import instances from '../../utils/plugin/axios'

//** Third party library*/
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'

//** images */
import { footer } from '../../assets/images'

const ProductDetails = () => {

    //** const & states */
    const params = useParams();
    const productDetail = useSelector((state) => state?.product.productDetail);
    const [recommend, setRecommend] = useState()

    useEffect(() => {
        document.title = params.name;
    }, [params.name])

    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get('/products/suggest', {
                params: {
                    currentProductID: productDetail?.productId,
                    cateid: productDetail?.categoryId
                }
            })
            setRecommend(res?.data?.result)
        }

        fetch()
    }, [productDetail])

    return (
        <div className='text-black '>
            <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
            <div className='sm:px-16 px-6 mb-20'>
                <ProductTopSection />
                <ProductMidSection />
                <ProductBottomSection />
                <RecommendSection recommend={recommend}/>
            </div>
        </div>
    )
}

export default ProductDetails