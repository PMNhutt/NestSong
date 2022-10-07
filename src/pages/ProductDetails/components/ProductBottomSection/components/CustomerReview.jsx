import React from 'react'
import { customer1 } from '../../../../../assets/images'

//** Third party components*/
import { Rating } from '@mui/material'

// ** fake comments
const comments =
{
  page: 1,
  result: [
    { id: 1, avatar: customer1, name: 'Nguyễn Văn A', star: 5, address: 'TP HCM', date: '2022-06-08', review: 'San pham rat tuyet, yen sao an rat ngon!' },
    { id: 2, avatar: customer1, name: 'Nguyễn Văn A', star: 5, address: 'TP HCM', date: '2022-06-08', review: 'San pham rat tuyet, yen sao an rat ngon!' },
  ],
  total_pages: 3,
  total_records: 6
}




const CustomerReview = () => {
  return (
    <div className='my-2'>
      <div className='flex flex-wrap gap-10 py-10'>
        <div className='flex gap-4'>
          <div className='w-[40px] h-[40px] bg-cover bg-center rounded-full' style={{ backgroundImage: `url(${customer1})` }} />
          <div>
            <p className='text-[18px] font-semibold mb-1'>Nguyn Van A</p>
            <Rating defaultValue={5} precision={0.5} readOnly size="small" />
            <p className='mt-1'>TP HCM</p>
          </div>
        </div>
        <div className='flex-1'>
          <p className='w-[40%] mb-2'>Sản phẩm ngon tuyệt vời, chắc chắn sẽ mua lại để biếu ông bà cha mẹ anh chị em họ hàng cô chú bác</p>
          <p>2022-06-21</p>
        </div>
      </div>
      <div className='flex flex-wrap gap-10 py-10'>
        <div className='flex gap-4'>
          <div className='w-[40px] h-[40px] bg-cover bg-center rounded-full' style={{ backgroundImage: `url(${customer1})` }} />
          <div>
            <p className='text-[18px] font-semibold mb-1'>Nguyn Van A</p>
            <Rating defaultValue={5} precision={0.5} readOnly size="small" />
            <p className='mt-1'>TP HCM</p>
          </div>
        </div>
        <div className='flex-1'>
          <p className='w-[40%] mb-2'>Sản phẩm ngon tuyệt vời, chắc chắn sẽ mua lại để biếu ông bà cha mẹ anh chị em họ hàng cô chú bác</p>
          <p>2022-06-21</p>
        </div>
      </div>
    </div>
  )
}

export default CustomerReview