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
    const productDetail = JSON.parse(localStorage.getItem('PRODUCT_DETAIL'))
    const recommendLProduct = useSelector((state) => state?.product?.productDetail?.suggestedProduct)
    const listFeedBack = useSelector((state) => state?.product?.productDetail?.listFeedbakcs)
    const [detailData, setDetailData] = useState()
    const [updateDetail, setUpdateDetail] = useState(false)

    useEffect(() => {
        document.title = params.name;
    }, [params.name])

    useEffect(() => {
        const fetch = async () => {
            dispatch(clearProductDetail(true))
            if (productDetail) {
                setDetailData(undefined)
                dispatch(getProductDetail())
                const res = await instances.get(`/products/id/${productDetail?.categoryId}/${productDetail?.productId}`, {
                    params: {
                        productId: productDetail?.productId,
                        categoryId: productDetail?.categoryId
                    }
                })
                // console.log(res?.data)
                setDetailData(res?.data)
            }
            dispatch(clearProductDetail(false))
        }
        fetch()
    }, [params.name])

    return (
        <>

            <div className='text-black '>
                <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
                {!loading ?
                    <div className='sm:px-16 px-6 mb-20'>
                        <ProductTopSection
                            detailData={detailData}
                        />
                        {/* <ProductMidSection /> */}
                        <ProductBottomSection listFeedBack={detailData?.listFeedbakcs} />
                        <RecommendSection recommend={detailData?.suggestedProduct} />
                    </div>
                    :
                    <div className='pt-[10%] h-[100vh]'>
                        <LoadingSmall />
                    </div>}
            </div>

        </>
    )
}

export default DetailContainer