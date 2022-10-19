import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';

const ModalRequireLogin = (props) => {
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
                    <p className='text-[20px] font-medium pt-5'>Bạn cần đăng nhập để tiếp tục thanh toán</p>
                    <Link to='/sign-in'>
                        <div className='bg-primary py-2 px-3 rounded cursor-pointer text-white text-center mt-5'>Đăng nhập ngay</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ModalRequireLogin