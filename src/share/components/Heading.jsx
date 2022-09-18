import React from 'react'

const Heading = ({ text, icon }) => {
    return (
        <div className='py-6'>
            <div className='relative w-fit'>
                <div className='w-[120px] h-[6px] bg-primary rounded-[50px] mb-3' />
                <div className='absolute w-[60px] h-[6px] bg-redError rounded-r-[50px] top-0 right-0' />
            </div>
            <div className='flex items-center gap-1'>
                <p className='font-maven font-semibold sm:text-[30px] text-[20px]'>{text}</p>
                <div className='w-[37px] h-[37px] bg-cover' style={{backgroundImage: `url(${icon})`}}/>
            </div>
        </div>
    )
}

export default Heading