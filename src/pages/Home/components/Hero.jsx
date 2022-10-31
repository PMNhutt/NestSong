import React from 'react'
import { bg1, img1, heroBanner, pro3, pro1 } from '../../../assets/images'
import { Underline_04 } from '../../../assets'
import styles from '../../../share/style'
import { Button } from '../../../share/components'
import TiltComponent from './TiltComponent'

// ** Third party libraries
import { Img } from 'react-image'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  const Image = () => (
    <Img
      src={bg1}
      loader={'loading'}
    />
  )

  // ** animation
  const animation = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.4,
      }
    },
    hidden: {
      opacity: 1,
    }
  }

  const childAnimations = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 1
      }
    },
    hidden: {
      opacity: 0,
      y: "3vw"
    }
  }

  const childAnimationLeft = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeOut",
        duration: 1
      }
    },
    hidden: {
      opacity: 0,
      x: "-3vw"
    }
  }

  const childAnimationRight = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeOut",
        duration: 1
      }
    },
    hidden: {
      opacity: 0,
      x: "3vw"
    }
  }

  return (
    <div className="w-full h-[100vh] bg-cover bg-bottom" style={{
      backgroundImage: `url(
                "${heroBanner}"
            )`,
    }}>
      <div
        variants={animation}
        initial="hidden"
        animate="visible"
        className={`sm:pl-16 pl-6 relative top-[22%] smd:flex flex-col smd:flex-row items-center h-fit font-maven`}>
        <p
          variants={childAnimations}
          className="drop-shadow-lg shadow-black font-semibold lg:text-[100px] sm:leading-[90px] sm:text-[90px] leading-[80px] xs:text-[80px] text-[60px]">Yến <span className="text-primary drop-shadow-lg shadow-black">Sào</span></p>
        <div
          variants={childAnimations}
          className="smd:flex flex-col smd:mt-0 mt-8 font-semibold lg:text-[72px] ss:text-[60px] text-[40px] ml-5 gap-[30px]">
          <div>
            <p
              // variants={childAnimations}
              className="sm:mb-6 mb-3 text-white">Nesty</p>
            <div
              // variants={childAnimations}
              className="sm:w-[250px] sm:h-[47px] w-[180px] h-[30px] bg-cover" style={{
                backgroundImage: `url(${Underline_04})`
              }} />
          </div>
          <p
            // variants={childAnimations}
            className="drop-shadow-lg shadow-black">Cho cuộc sống</p>
        </div>
      </div>

      {/* <motion.div
        variants={animation}
        initial="hidden"
        animate="visible"
        className="relative top-[5%] md:flex hidden right-0 pr-16 float-right flex-row-reverse gap-7 items-center">
        <div>
          <motion.div
            variants={childAnimationRight}
            className="mb-5">
            <TiltComponent img={img1} text='Tổ Yến Tinh Chế' tiltX={-5} tiltY={10} />
          </motion.div>
          <motion.div variants={childAnimationRight}>
            <TiltComponent img={pro3} text='Đảm Bảo Sức Khỏe' tiltX={3} tiltY={5} />
          </motion.div>
        </div>
        <motion.div variants={childAnimationRight}>
          <TiltComponent img={pro1} text='100% Nguyên Chất' tiltX={-5} tiltY={-10} />
        </motion.div>
      </motion.div> */}

      <div
        variants={animation}
        initial="hidden"
        animate="visible"
        className="relative md:top-[33%] top-[28%] md:w-[50%] sm:w-[80%]">
        <div
          variants={childAnimationLeft}
          className={`${styles.paragraph} sm:pl-16 pl-6 pr-8 pt-3 py-8 drop-shadow-lg shadow-black w-full side-black`}>
          Yến sào Nesty CAM KẾT chỉ cung cấp sản phẩm yến sào nguyên chất 100% - Không tẩm đường -  Không pha trộn - Không tẩy trắng.
          Chúng tôi luôn đề cao sức khoẻ khách hàng, cùng khách hàng lựa chọn sản phẩm và chia sẻ kinh nghiệm sử dụng yến sào.
        </div>
        <div
          variants={childAnimationLeft}
          className="flex gap-[20px] absolute bottom-[-20px] sm:pl-16 pl-6">
          <Link to='/about'>
            <Button styles="rounded-[5px] bg-primary">Xem chi tiết</Button>
          </Link>
          <Link to='/products'>
            <Button styles="rounded-[5px] bg-redError">Đặt hàng ngay</Button>
          </Link>
        </div>
      </div>



    </div>
  )
}

export default Hero