import React from 'react'
import { starts, quote, customer1 } from '../../../assets/images'

const Comment = ({ name, comment, address, ava }) => {
    return (
        <div className='font-maven text-black  p-6 rounded-[5px] shadow-lg w-[350px]'>
            <div className='w-[50px] h-[50px] bg-contain bg-no-repeat' style={{backgroundImage: `url(${quote})`}}/>
            <div className='w-[90px] h-[15px] bg-contain bg-no-repeat my-5' style={{backgroundImage: `url(${starts})`}}/>
            <p className='text-[18px]'>{comment}</p>
            <div className='flex items-center gap-5 my-6'>
                <div className='w-[40px] h-[40px] bg-cover bg-center rounded-full' style={{backgroundImage: `url(${ava})`}}/>
                <div>
                    <p className='font-semibold'>{name}</p>
                    <p>{address}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment