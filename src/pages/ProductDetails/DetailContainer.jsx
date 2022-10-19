import { useEffect, useState } from 'react'
import ProductTopSection from './components/ProductTopSection/ProductTopSection'
import ProductMidSection from './components/ProductMidSection/ProductMidSection'
import ProductBottomSection from './components/ProductBottomSection/ProductBottomSection'
import RecommendSection from './components/RecommendSection/RecommendSection'
import instances from '../../utils/plugin/axios'
import { getProductDetail } from '../../redux/actionSlice/productSlice'

//** images */
import { footer } from '../../assets/images'

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const DetailContainer = () => {

    const params = useParams();
    const dispatch = useDispatch()
    const productDetail = useSelector((state) => state?.product?.productDetail);
    const recommendLProduct = useSelector((state) => state?.product?.productDetail?.suggestedProduct)
    const listFeedBack = useSelector((state) => state?.product?.productDetail?.listFeedbakcs)

    useEffect(() => {
        document.title = params.name;
    }, [params.name])

    // useEffect(() => {
    //     const fetch = async () => {
    //         const res = await instances.get('/products/suggest', {
    //             params: {
    //                 currentProductID: productDetail?.productId,
    //                 cateid: productDetail?.categoryId
    //             }
    //         })
    //         setRecommend(res?.data?.result)
    //     }

    //     fetch()
    // }, [productDetail])

    useEffect(() => {
        dispatch(getProductDetail())
    }, [])

    return (
        <div className='text-black '>
            <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
            <div className='sm:px-16 px-6 mb-20'>
                <ProductTopSection />
                {/* <ProductMidSection /> */}
                <ProductBottomSection listFeedBack={listFeedBack} />
                <RecommendSection recommend={recommendLProduct} />
            </div>
        </div>
    )
}

export default DetailContainer