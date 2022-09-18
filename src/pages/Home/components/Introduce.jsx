import React from 'react'
import styles from '../../../share/style'
import { introduce } from '../../../assets/images'
import { Heading, Button } from '../../../share/components'

//** Third party components
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Introduce = () => {
  return (
    <div className={`text-black ${styles.paddingY} font-maven `}>
      <div className='flex items-center flex-col md:flex-row w-full gap-12'>
        <motion.div
          initial={{ opacity: 0, x: '-2vw' }}
          whileInView={{
            opacity: 1, x: 0, transition: {
              duration: 0.8
            }
          }}
          viewport={{ once: true, amount: 0.5 }}
          className='sm:pl-16 pl-6 flex-1 rounded-r-[5px] relative z-10'>
          <Heading text='Yến Sào Nesty' />
          <p className='font-semibold'>Chuyên phân phối tổ yến tươi, yến sào nguyên chất 100%, cam kết CHẤT LƯỢNG – KHÔNG PHA TRỘN. Với mong muốn mang đến nguồn sản phẩm NÂNG CAO SỨC KHỎE cho người dùng. <br />
            Nesty luôn đặt chất lượng sản phẩm lên hàng đầu, đặc biệt Yến sào Nesty đảm bảo giữ nguyên vị thuần túy 100% từ tổ Yến tự nhiên.</p>
          <Link to='/about'>
            <Button styles={'rounded-[5px] bg-redError my-7'}>Xem chi tiết</Button>
          </Link>
          <div className='absolute bottom-8 -left-[20%] w-80 h-80 rounded-full bg-blue-300 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-[0.7] z-[-1]' /> 
          <div className='absolute bottom-[5%] -left-[3%] top-15 w-80 h-80 rounded-full bg-red-200 mix-blend-multiply filter blur-xl animate-blob opacity-[0.7] z-[-1]' /> 
          <div className='absolute -left-[0%] -top-[5%] w-[22rem] h-[22rem] rounded-full bg-purple-300 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-[0.7] z-[-1]' /> 
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: '2vw' }}
          whileInView={{
            opacity: 1, x: 0, transition: {
              duration: 0.8
            }
          }}
          viewport={{ once: true, amount: 0.5 }}
          className='md:w-[750px] w-full h-[496px] bg-contain bg-no-repeat sm:mr-16 mr-6' style={{ backgroundImage: `url(${introduce})` }} />
      </div>
    </div>
  )
}

export default Introduce