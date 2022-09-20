import React from 'react'
import styles from '../../../share/style'
import { complete, shopping, truck, like, share } from '../../../assets'

//** Third party components
import { motion } from 'framer-motion'

const Policies = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: '2vw' }}
      whileInView={{
        opacity: 1, y: 0, transition: {
          duration: 0.8
        }
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={`text-black ${styles.paddingX} ${styles.paddingY} font-maven`}>
      <div
        viewport={{ once: true, amount: 0.3 }}
        className='flex flex-wrap sm:gap-0 gap-10 justify-between'>
        <div className='flex gap-4 items-center'>
          <div className='w-[50px] h-[50px] bg-cover' style={{ backgroundImage: `url(${shopping})` }} />
          <p className='text-[18px]'>Yên tâm mua sắm <br /> giải tỏa lo âu</p>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='w-[50px] h-[50px] bg-cover' style={{ backgroundImage: `url(${complete})` }} />
          <p className='text-[18px]'>Sản phẩm chính ngạch <br /> nguồn gốc rõ ràng</p>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='w-[50px] h-[50px] bg-cover' style={{ backgroundImage: `url(${truck})` }} />
          <p className='text-[18px]'>Giao hàng nhanh chóng <br /> uy tín đảm bảo</p>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='w-[50px] h-[50px] bg-cover' style={{ backgroundImage: `url(${like})` }} />
          <p className='text-[18px]'>Được các chuyên gia <br /> hàng đầu khuyên dùng</p>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='w-[50px] h-[50px] bg-cover' style={{ backgroundImage: `url(${share})` }} />
          <p className='text-[18px]'>Theo sát liệu trình <br /> sử dụng sản phẩm</p>
        </div>
      </div>
    </motion.section>
  )
}

export default Policies