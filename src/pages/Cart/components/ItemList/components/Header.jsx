import React from 'react'

const Header = () => {
    return (
        <div className='border rounded-[5px] shadow-md px-6 py-2 mb-3 flex font-semibold'>
            <div className='w-[60%]'>Sản Phẩm</div>
            <div className='w-[40%] flex justify-between'>
                <p className='sm:block hidden'>Số Lượng</p>
                <p className='sm:block hidden'>Đơn Giá</p>
                <p>Tổng</p>
            </div>
        </div>
    )
}

export default Header