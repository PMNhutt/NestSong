import { useState } from 'react'

//** Third party components*/
import { Swiper, SwiperSlide } from "swiper/react"
// import 'swiper/swiper-bundle.css'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { useSelector } from 'react-redux'

// import Swiper core and required modules
import { Mousewheel, Pagination, Thumbs, Navigation } from "swiper"

//image
import { product, productBig } from '../../../../../assets/images'

const product_media = [
    { id: 1, url: productBig, url_thumb: product },
    { id: 2, url: productBig, url_thumb: product },
    { id: 3, url: productBig, url_thumb: product },
    { id: 4, url: productBig, url_thumb: product },
]

const ProductSlider = (props) => {

    //** State */
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const handleThumbsSwiper = (e) => {
        console.log(e)
    }
    const productMedia = useSelector((state) => state.product?.productDetail?.productMedia)

    const [indexSwiper, setIndexSwiper] = useState(0)

    const handleChangeSwiper = (swiper) => {
        setIndexSwiper(swiper?.activeIndex)
    }

    return (
        <div className='flex items-start sm:flex-row flex-col-reverse'>
            <div className={`containerSwiperSmall sm:h-[600px] sm:w-[100px] sm:mr-[9px] sm:p-0 p-[15px] w-full h-auto`}>
                <Swiper
                    modules={[Navigation, Thumbs, Pagination]}
                    onSwiper={(e) => setThumbsSwiper(e)}
                    direction={'horizontal'}
                    spaceBetween={7}
                    slidesPerView={'auto'}
                    className="mySwiper sm:h-[600px]"
                    watchSlidesProgress={true}
                    // watchSlidesVisibility={true}
                    watchOverflow={true}
                    
                    breakpoints={{
                        769: {
                            direction: 'vertical'
                        },
                        200: {
                            direction: 'horizontal'
                        }
                    }}
                >
                    {
                        props.productMedia?.length > 0 &&
                        props.productMedia?.map((item, index) => {
                            return (
                                <SwiperSlide key={item.imageId}>
                                    {
                                        // <div className={`swiper-slide-media bg-cover bg-center bg-no-repeat
                                        // h-full w-full overflow-hidden cursor-pointer pt-[100%]`} style={{ backgroundImage: `url('${item?.url_thumb}')` }} />
                                        <img className='w-full h-[90px] swiper-slide-media cursor-pointer object-cover' src={`data:image/webp;base64,${item?.smallImage}`} />

                                    }
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
            <div className={`containerSwiperMain sm:w-[600px] w-full`}>
                <Swiper
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[Navigation, Thumbs, Mousewheel, Pagination]}
                    slidesPerView={1}
                    spaceBetween={20}
                    direction={'horizontal'}
                    keyboard={{
                        enabled: true
                    }}
                    onSlideChange={handleChangeSwiper}
                    // allowSlidePrev={this.state?.mediaList?.length > 1}
                    // allowSlideNext={this.state?.mediaList?.length > 1}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 0.5,
                        thresholdDelta: 14
                    }}
                    preventInteractionOnTransition={true}
                    watchSlidesProgress={true}
                    // watchSlidesVisibility={true}
                    watchOverflow={true}
                    pagination={true}
                    className='w-[100%] sm:h-[600px] h-[350px]'
                    breakpoints={{
                        769: {
                            direction: 'vertical',
                            pagination: false
                        },
                        320: {
                            direction: 'horizontal',
                            slidesPerView: 1,
                            slidesPerGroup: 1
                        }
                    }}
                >
                    {
                        props.productMedia?.length > 0 &&
                        props.productMedia?.map((item, index) => {
                            // const replaceMediaUrl = replaceUrlImage(item?.url)
                            return (
                                <SwiperSlide key={item.imageId}>
                                    {
                                        // <div className={`cursor-grabbing background-image bg-cover bg-center bg-no-repeat h-full w-full rounded-[5px]`}
                                        //     // onClick={() => this.handleMediaSelected(index)}
                                        //     style={{ backgroundImage: `url('${item?.url}')` }} />
                                        <img className='w-full h-full swiper-slide-media cursor-grabbing object-cover rounded-[5px] background-image' src={`data:image/webp;base64,${item?.bigImage}`} />
                                    }
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ProductSlider