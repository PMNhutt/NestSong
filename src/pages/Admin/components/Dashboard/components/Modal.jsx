import React from 'react'

const Modal = (props) => {
    return (
        <div className='bg-white p-10 border shadow-lg rounded min-w-[260px] flex flex-col items-center gap-3'>
            <div className='w-[80px] h-[80px] bg-cover bg-center' style={{ backgroundImage: `url(${props?.picture})` }} />
            <p className='font-medium'>{props?.name}: <span className='font-normal'>{props?.value}</span></p>
        </div>
    )
}

export default Modal