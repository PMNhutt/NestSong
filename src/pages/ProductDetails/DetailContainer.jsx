import { useEffect, useState } from 'react'
import ProductTopSection from './components/ProductTopSection/ProductTopSection'
import ProductMidSection from './components/ProductMidSection/ProductMidSection'
import ProductBottomSection from './components/ProductBottomSection/ProductBottomSection'
import RecommendSection from './components/RecommendSection/RecommendSection'
import instances from '../../utils/plugin/axios'
import { getProductDetail, clearProductDetail } from '../../redux/actionSlice/productSlice'
import LoadingSmall from '../../share/components/LoadingSmall/LoadingSmall'

//** images */
import { footer } from '../../assets/images'

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const DetailContainer = () => {

    const params = useParams();
    const dispatch = useDispatch()
    const loading = useSelector((state) => state?.product?.loading)
    const productDetail = useSelector((state) => state?.product?.productDetail.productDetail);
    const recommendLProduct = useSelector((state) => state?.product?.productDetail?.suggestedProduct)
    const listFeedBack = useSelector((state) => state?.product?.productDetail?.listFeedbakcs)

    useEffect(() => {
        document.title = params.name;
    }, [params.name])

    useEffect(() => {
        const fetch = async () => {
            dispatch(clearProductDetail(true))
            if (productDetail) {
                const res = await instances.get(`/products/id/${productDetail?.categoryId}/${productDetail?.productId}`, {
                    params: {
                        productId: productDetail?.productId,
                        categoryId: productDetail?.categoryId
                    }
                })
            }
            dispatch(clearProductDetail(false))
        }
        dispatch(getProductDetail())
        fetch()
    }, [])

    return (
        <>
            {
                !loading ?
                    <div className='text-black '>
                        <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
                        <div className='sm:px-16 px-6 mb-20'>
                            <ProductTopSection />
                            {/* <ProductMidSection /> */}
                            <ProductBottomSection listFeedBack={listFeedBack} />
                            <RecommendSection recommend={recommendLProduct} />
                        </div>
                    </div> :
                    <div className='pt-[10%]'>
                        <LoadingSmall />
                    </div>
            }
        </>
    )
}

export default DetailContainer