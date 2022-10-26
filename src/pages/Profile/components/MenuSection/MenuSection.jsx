import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';

const MenuSection = (props) => {
    return (
        <div className='mt-8'>
            <div
                onClick={() => props.setActiveMenu(1)}
                className={`flex gap-2 items-center mb-3 cursor-pointer hover:text-primary ${props?.activeMenu === 1 ? 'text-primary' : ''}`}>
                <AssignmentIcon sx={{ color: '#3498db' }} />
                <p>Theo dõi đơn hàng</p>
            </div>
            <div
                onClick={() => props.setActiveMenu(2)}
                className={`flex gap-2 items-center mb-3 cursor-pointer hover:text-primary ${props?.activeMenu === 2 ? 'text-primary' : ''}`}>
                <PersonIcon sx={{ color: '#3498db' }} />
                <p>Tài khoản của tôi</p>
            </div>
        </div>
    )
}

export default MenuSection