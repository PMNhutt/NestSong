import { useState, useEffect, useRef } from 'react'

const ViewDetailOrder = (props) => {
    return (
        <div>
            <div
                onClick={() => props.setIsShowModal(false)}
                className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[900]' />
            <div className='sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>

                <div className='font-maven p-5'>
                    <p className='font-semibold text-[20px]'>Chi tiết đơn hàng</p>
                </div>
            </div>
        </div>
    )
}

export default ViewDetailOrder