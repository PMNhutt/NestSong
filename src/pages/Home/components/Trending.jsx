import { useEffect, useState } from 'react'
import styles from '../../../share/style'
import { Heading, Product } from '../../../share/components'
import { fire } from '../../../assets/images'
import LoadingSmall from '../../../share/components/LoadingSmall/LoadingSmall'

//** Third party components
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import instances from '../../../utils/plugin/axios'

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
const Trending = () => {
  // ** State
  const [trending, setTrending] = useState()

  // get trending products
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/products/trending')
      // console.log(res?.data?.result);
      setTrending(res?.data?.result)
    }

    fetch()
  }, [])


  return (
    <section className="text-black sm:pl-16 pl-6 mt-[5%]">
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
      {
        trending ?
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
              {
                trending?.map((product) => (
                  <SwiperSlide key={product?.productId}>
                    <Product data={product} />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </motion.div>
          : <LoadingSmall />
      }
    </section>
  )
}

export default Trending