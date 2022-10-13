import React from 'react'

//** icons **/
import { icCard, icCashPayment } from '../../../../assets/images'

const PaymentMethod = () => {
    return (
        <div className='text-black w-full border rounded-[5px] shadow-md mt-5 px-6 py-2 h-fit'>
            <div className='pb-3 mb-3 border-b flex items-center gap-2'>
                <div className='w-[25px] h-[25px] bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${icCard})` }} />
                <p className='font-semibold uppercase text-[20px]'>Phương thức thanh toán</p>
            </div>
            <div className='flex gap-2 items-center'>
                <p className=''>Thanh toán khi nhận hàng</p>
                <div className='w-[30px] h-[30px] bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${icCashPayment})` }} />
            </div>
        </div>
    )
}

export default PaymentMethod