import React from 'react'
import { Heading, Product } from '../../../../share/components'

//** Third party components*/
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//fake data
const data = [
    { productId: 2, productName: 'Yến Sào đặt biệt loại thượng hạng 2', stock: 10, soldQuantity: 22, price: 500000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 1, productName: 'Yến Sào đặt biệt loại thượng hạng 1', stock: 10, soldQuantity: 20, price: 525000, off_price: 3120541, discount: 0.2, rating: 4 },
    { productId: 3, productName: 'Yến Sào đặt biệt loại thượng hạng 3', stock: 10, soldQuantity: 23, price: 500000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 4, productName: 'Yến Sào đặt biệt loại thượng hạng 4', stock: 10, soldQuantity: 25, price: 450000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 5, productName: 'Yến Sào đặt biệt loại thượng hạng 5', stock: 10, soldQuantity: 26, price: 500000, off_price: 3120541, discount: 0.2, rating: 3.5 },
    { productId: 6, productName: 'Yến Sào đặt biệt loại thượng hạng 6', stock: 10, soldQuantity: 23, price: 245000, off_price: 3120541, discount: 0.2, rating: 4 },
    { productId: 7, productName: 'Yến Sào đặt biệt loại thượng hạng 7', stock: 10, soldQuantity: 27, price: 500000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 8, productName: 'Yến Sào đặt biệt loại thượng hạng 8', stock: 10, soldQuantity: 25, price: 350000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 9, productName: 'Yến Sào đặt biệt loại thượng hạng 9', stock: 10, soldQuantity: 23, price: 500000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 10, productName: 'Yến Sào đặt biệt loại thượng hạng 10', stock: 10, soldQuantity: 60, price: 225000, off_price: 3120541, discount: 0.2, rating: 5 },

]

const RecommendSection = (props) => {
    return (
        <div className='border shadow-lg rounded-[5px] py-3 px-5 my-8'>
            <Heading text='Sản phẩm cùng loại' />
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    breakpoints={{
                        1200: {
                            slidesPerView: 5
                        },
                        1060: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        480: {
                            slidesPerView: 2,
                        }
                    }}
                    grabCursor={true}
                    // loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className='mySwiper py-[10px]'
                >
                    {/* {data?.map((product) => (
                        <SwiperSlide key={product?.productId}>
                            <Product data={product} />
                        </SwiperSlide>))} */}
                    {props?.recommend?.map((product) => (
                        <SwiperSlide key={product?.productId}>
                            <Product data={product} />
                        </SwiperSlide>))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default RecommendSection