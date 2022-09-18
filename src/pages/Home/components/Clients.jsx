import React from 'react'
import { Heading } from '../../../share/components'
import styles from '../../../share/style'
import { diamond, customer1, customer2, customer3 } from '../../../assets/images'
import Comment from './Comment'
import { motion } from 'framer-motion'

const Clients = () => {
  const data = [
    {
      id: 1,
      name: 'Nguyễn Thị Vân Anh',
      comment: 'Chất lượng hơn cả giá thành, bao bì đóng gói rất ok, nhân viên nhiệt tình.',
      address: 'TP Hồ Chí Minh',
      ava: customer1
    },
    {
      id: 2,
      name: 'Lê Anh Hào',
      comment: 'Yến thơm ngon chuẩn vị, mình là dân sành ăn Yến nên ăn vô là biết chất lượng như nào ngay!',
      address: 'TP Hồ Chí Minh',
      ava: customer2
    },
    {
      id: 3,
      name: 'Trần Bảo Ngọc',
      comment: 'Mình mua lần này là lần thứ 5 rồi, yến tinh chế làm sạch dễ dùng, mình dùng nấu cháo ăn rất ngon.',
      address: 'TP Hồ Chí Minh',
      ava: customer3
    }
  ]
  return (
    <section className={`text-black font-maven ${styles.paddingX} py-10 overflow-hidden `}>
      <div>
        <motion.div
          initial={{ opacity: 0, x: '-2vw' }}
          whileInView={{
            opacity: 1, x: 0, transition: {
              duration: 0.8
            }
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Heading text='Đánh giá của khách hàng' icon={diamond} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '2vw' }}
          whileInView={{
            opacity: 1, y: 0, transition: {
              duration: 0.8
            }
          }}
          viewport={{ once: true, amount: 0.5 }}
          className='flex flex-wrap gap-8 relative'>
          {data?.map((cmt) => (
            <Comment key={cmt.id} name={cmt.name} comment={cmt.comment} address={cmt.address} ava={cmt.ava} />
          ))}
          <div className='absolute bottom-8 -right-[7%] w-72 h-72 rounded-full bg-blue-300 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-[0.7]' /> 
          <div className='absolute bottom-[5%] -right-[3%] top-15 w-72 h-72 rounded-full bg-red-200 mix-blend-multiply filter blur-xl animate-blob opacity-[0.7]' /> 
          <div className='absolute -right-[0%] -top-[5%] w-72 h-72 rounded-full bg-purple-300 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-[0.7]' /> 
        </motion.div>

      </div>
    </section>
  )
}

export default Clients