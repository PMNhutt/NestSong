import { useState, useEffect } from 'react'
import { nestLogo } from '../../../../assets'

//** third party libraries*/
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArticleIcon from '@mui/icons-material/Article';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Sidebar = (props) => {

    const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

    return (
        <div className='text-black w-[240px] h-[100vh] shadow-lg bg-white p-6 fixed top-0'>
            <div className='flex gap-4 items-center'>
                <div className='w-[40px] h-[40px] bg-cover bg-center' style={{ backgroundImage: `url(${nestLogo})` }} />
                <p className='uppercase tracking-[2px] text-[20px]'>Nesty</p>
            </div>
            <div className='mt-10'>
                {
                    loggedInUser.authorizeRole === 'Admin' &&
                    <>
                        <div
                            onClick={() => props.setActiveTab(0)}
                            className={`flex items-center gap-2 cursor-pointer ${props.activeTab === 0 ? 'text-primary' : 'text-gray-500'} mb-5`}>
                            <DashboardRoundedIcon />
                            <p>Dashboard</p>
                        </div>

                        <div className='pt-3'>
                            <div
                                onClick={() => props.setActiveTab(1)}
                                className={`flex items-center gap-2 cursor-pointer ${props.activeTab === 1 ? 'text-primary' : 'text-gray-500'} mb-5`}>
                                <ShoppingBasketRoundedIcon />
                                <p>Quản lý sản phẩm</p>
                            </div>
                        </div>

                        <div className='pt-3'>
                            <div
                                onClick={() => props.setActiveTab(2)}
                                className={`flex items-center gap-2 cursor-pointer ${props.activeTab === 2 ? 'text-primary' : 'text-gray-500'} mb-5`}>
                                <ManageAccountsIcon />
                                <p>Quản lý nhân viên</p>
                            </div>
                        </div>

                        <div className='pt-3'>
                            <div
                                onClick={() => props.setActiveTab(3)}
                                className={`flex items-center gap-2 cursor-pointer ${props.activeTab === 3 ? 'text-primary' : 'text-gray-500'} mb-5`}>
                                <AttachMoneyIcon />
                                <p>Thống kê doanh thu</p>
                            </div>
                        </div>
                    </>
                }

                {
                    loggedInUser.authorizeRole === 'Staff' &&
                    <>
                        <div
                            onClick={() => props.setActiveTab(0)}
                            className={`flex items-center gap-2 cursor-pointer ${props.activeTab === 0 ? 'text-primary' : 'text-gray-500'} mb-5`}>
                            <ArticleIcon />
                            <p>Đơn đặt hàng</p>
                        </div>

                        <div className='pt-3'>
                            <div
                                onClick={() => props.setActiveTab(1)}
                                className={`flex items-center gap-2 cursor-pointer ${props.activeTab === 1 ? 'text-primary' : 'text-gray-500'} mb-5`}>
                                <PostAddIcon />
                                <p>Tạo đơn</p>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Sidebar