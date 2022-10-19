import React from 'react'
import Modal from './components/Modal'

// ** images
import { dashboardProduct, dashboardUser, dashboardOrder } from '../../../../assets/images'

const Dashboard = () => {
  return (
    <div className='text-black'>
      <div className='flex gap-3'>
        <Modal
          picture={dashboardProduct}
          name='Tổng sản phẩm'
          value={50}
        />
        <Modal
          picture={dashboardUser}
          name='Nhân viên'
          value={10}
        />
        <Modal
          picture={dashboardOrder}
          name='Đơn hàng'
          value={10}
        />
      </div>
    </div>
  )
}

export default Dashboard