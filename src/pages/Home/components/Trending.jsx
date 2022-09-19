import React from 'react'
import styles from '../../../share/style'
import { Heading, Product } from '../../../share/components'
import { fire } from '../../../assets/images'

//** Third party components
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Trending = () => {

  const data = [
    { id: 1, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 20, price: 3650214, off_price: 3120541, discount: 20 },
    { id: 2, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 22, price: 3650214, off_price: 3120541, discount: 20 },
    { id: 3, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 23, price: 3650214, off_price: 3120541, discount: 20 },
    { id: 4, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 25, price: 3650214, off_price: 3120541, discount: 20 },
    { id: 5, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 26, price: 3650214, off_price: 3120541, discount: 20 },
    { id: 6, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 23, price: 3650214, off_price: 3120541, discount: 20 },
    { id: 7, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 27, price: 3650214, off_price: 3120541, discount: 20 },
    { id: 8, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 25, price: 3650214, off_price: 3120541, discount: 20 },
    { id: 9, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 23, price: 3650214, off_price: 3120541, discount: 20 },
    { id: 10, name: 'Yến Sào đặt biệt loại thượng cmn hạng', sold: 60, price: 3650214, off_price: 3120541, discount: 20 },

  ]
  return (
    <section className="text-black sm:pl-16 pl-6 mt-[10%]">
      <motion.div
        initial={{ opacity: 0, x: '-3vw' }}
        whileInView={{
          opacity: 1, x: 0, transition: {
            duration: 1
          }
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Heading text={'Sản phẩm bán chạy'} icon={fire} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: '2vw' }}
        whileInView={{
          opacity: 1, y: 0, transition: {
            duration: 0.8
          }
        }}
        viewport={{ once: true, amount: 0.3 }}
        className='flex'>
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
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className='mySwiper py-[10px]'
        >
          {data?.map((product) => (
            <SwiperSlide key={product.id}>
              <Product
                price={product.price}
                off_price={product.off_price}
                sold={product.sold}
                discount={product.discount}
                name={product.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}

export default Trending