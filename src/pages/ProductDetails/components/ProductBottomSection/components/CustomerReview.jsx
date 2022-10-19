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

const CustomerReview = (props) => {
  return (
    <div className='my-2'>

      {
        props?.listFeedBack?.length > 0 &&
        props?.listFeedBack?.map((item, index) => (
          <div key={index} className='flex flex-wrap gap-10 py-10'>
            <div className='flex gap-4'>
              <div className='w-[40px] h-[40px] bg-cover bg-center rounded-full' style={{ backgroundImage: `url(${item?.avatar ? item?.avatar : customer1})` }} />
              <div>
                <p className='text-[18px] font-semibold mb-1'>{item?.customerName}</p>
                <Rating defaultValue={item?.stars} value={item?.stars} precision={0.5} readOnly size="small" />
                <p className='mt-1'>{item?.address}</p>
              </div>
            </div>
            <div className='flex-1'>
              <p className='w-[40%] mb-2'>{item?.comment}</p>
              <p>{item?.feedbackDate}</p>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default CustomerReview