import { useState, useEffect, useRef } from 'react'
import completeOrder from '../../../lottie/completeOrder.json'

//** Third party components*/
import CloseIcon from '@mui/icons-material/Close';
import Lottie from 'lottie-react'

const ModalStaffOrder = (props) => {
    return (
        <div>
            <div
                onClick={() => props.setOpenModal(false)}
                className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[900]' />
            <div className='sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%] py-5 px-5'>
                <div className='font-maven text-black relative'>
                    <div
                        onClick={() => props.setOpenModal(false)}
                        className='absolute top-[-12px] right-[-12px] cursor-pointer text-red-600'>
                        <CloseIcon />
                    </div>
                    <Lottie
                        animationData={completeOrder}
                        loop={true}
                        controls={false}
                        className="h-[30vh]"
                    />
                    <p className='text-[20px] font-medium pt-5'>Tạo đơn hàng thành công!</p>
                </div>
            </div>
        </div>
    )
}

export default ModalStaffOrder