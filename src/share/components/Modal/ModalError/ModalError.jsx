import { useState, useEffect } from 'react'
import error from '../../../lottie/error-lottie.json'

import Lottie from 'lottie-react'

const ModalError = (props) => {
    return (
        <>
            <div
                onClick={() => props?.setOpenErrorModal(false)}
                className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[9999]'>
            </div>
            <div className='sm:w-max w-full bg-white fixed z-[99999] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>
                <div className='font-maven text-center p-5'>
                    <Lottie
                        animationData={error}
                        loop={true}
                        controls={false}
                        className="h-[30vh]"
                    />
                    <p className='text-black text-[18px] font-medium'>{props?.title || 'Đã có lỗi xảy ra!'}</p>
                </div>
            </div>
        </>
    )
}

export default ModalError