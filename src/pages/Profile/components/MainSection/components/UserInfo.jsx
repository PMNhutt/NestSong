import { useState, useEffect } from 'react'
import LoadingSmall from '../../../../../share/components/LoadingSmall/LoadingSmall'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const UserInfo = (props) => {
    //** State */
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [oldPassWord, setOldPassWord] = useState('')
    const [newPassWord, setNewPassWord] = useState('')
    const [togglePassword, setTogglePassword] = useState(false)

    useEffect(() => {
        setFirstName(props?.data?.firstName || '')
        setLastName(props?.data?.lastName || '')
        setEmail(props?.data?.email || '')
        setPhone(props?.data?.phoneNumber || '')
        setAddress(props?.data?.address || '')
        setOldPassWord(props?.data?.password || '')
    }, [props?.data])

    //** validate number */
    const handleKeyDown = (e) => {
        if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110
            || e.keyCode === 189) {
            e.preventDefault();
        }
    }

    return (
        <div className='px-7 py-5 rounded border shadow-md'>
            <div className='border-b-gray-300 border-b pb-4'>
                <p className='text-[20px] mb-1 font-medium'>Thông Tin Cá Nhân</p>
                <p>Cập nhật thông tin tài khoản của bạn</p>
            </div>

            {
                props?.data !== undefined ?
                    <div className="mt-6">
                        <div className='flex w-full gap-5'>
                            <div className='flex-1'>
                                <div className='w-[100%] mb-[20px]'>
                                    <div className='flex items-center justify-end gap-4'>
                                        <span className='text-gray-400 w-[20%] text-right'>Họ</span>
                                        <input
                                            type='text'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className='w-[80%]
                        py-2 px-3 bg-white rounded border h-[40px] border-gray-400 focus:border-primary focus:outline-none'/>
                                    </div>
                                </div>

                                <div className='w-[100%] mb-[20px]'>
                                    <div className='flex items-center justify-end gap-4'>
                                        <span className='text-gray-400 w-[20%] text-right'>Tên</span>
                                        <input
                                            type='text'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className='w-[80%]
                        py-2 px-3 bg-white rounded border h-[40px] border-gray-400 focus:border-primary focus:outline-none'/>
                                    </div>
                                </div>

                                <div className='w-[100%] mb-[20px]'>
                                    <div className='flex items-center justify-end gap-4'>
                                        <span className='text-gray-400 w-[20%] text-right'>Email</span>
                                        <input
                                            type='text'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className='w-[80%]
                        py-2 px-3 bg-white rounded border h-[40px] border-gray-400 focus:border-primary focus:outline-none'/>
                                    </div>
                                </div>
                            </div>

                            <div className='flex-1'>
                                <div className='w-[100%] mb-[20px]'>
                                    <div className='flex items-center justify-end gap-4'>
                                        <span className='text-gray-400 w-[20%] text-right'>Số điện thoại</span>
                                        <input
                                            type='number'
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className='w-[80%]
                        py-2 px-3 bg-white rounded border h-[40px] border-gray-400 focus:border-primary focus:outline-none'/>
                                    </div>
                                </div>

                                <div className='w-[100%] mb-[20px]'>
                                    <div className='flex items-center justify-end gap-4'>
                                        <span className='text-gray-400 w-[20%] text-right'>Địa chỉ</span>
                                        <input
                                            type='text'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className='w-[80%]
                        py-2 px-3 bg-white rounded border h-[40px] border-gray-400 focus:border-primary focus:outline-none'/>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className='w-full flex justify-end'>
                            <div className='my-[20px] bg-primary rounded cursor-pointer px-3 py-2 text-white font-semibold w-fit'>Cập nhật thông tin</div>
                        </div>
                    </div>
                    : <LoadingSmall />
            }

            <div className='border-b-gray-300 border-b pb-4 mt-8'>
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => setTogglePassword(prev => !prev)}>
                    <p className='text-[20px] mb-1 font-medium'>Bảo mật tài khoản</p>
                    <KeyboardArrowDownIcon />
                </div>
                <p>Đổi mật khẩu</p>
            </div>

            {
                togglePassword &&
                (props?.data !== undefined ?
                    <div className='mt-6'>

                        <div className='w-[49%] mb-[20px]'>
                            <div className='flex items-center justify-end gap-4'>
                                <span className='text-gray-400 w-[20%] text-right'>Mật khẩu cũ</span>
                                <input
                                    type='password'
                                    value={oldPassWord}
                                    onChange={(e) => setOldPassWord(e.target.value)}
                                    className='w-[80%]
                        py-2 px-3 bg-white rounded border h-[40px] border-gray-400 focus:border-primary focus:outline-none'/>
                            </div>
                        </div>

                        <div className='w-[49%] mb-[20px]'>
                            <div className='flex items-center justify-end gap-4'>
                                <span className='text-gray-400 w-[20%] text-right'>Mật khẩu mới</span>
                                <input
                                    type='password'
                                    value={newPassWord}
                                    onChange={(e) => setNewPassWord(e.target.value)}
                                    className='w-[80%]
                        py-2 px-3 bg-white rounded border h-[40px] border-gray-400 focus:border-primary focus:outline-none'/>
                            </div>
                        </div>

                        <div className='w-[49%] mb-[20px]'>
                            <div className='flex items-center justify-end gap-4'>
                                <span className='text-gray-400 w-[20%] text-right'>Xác nhận mật khẩu mới</span>
                                <input
                                    type='password'
                                    value={newPassWord}
                                    onChange={(e) => setNewPassWord(e.target.value)}
                                    className='w-[80%]
                        py-2 px-3 bg-white rounded border h-[40px] border-gray-400 focus:border-primary focus:outline-none'/>
                            </div>
                        </div>

                        <div className='flex w-full justify-end'>
                            <div className='mb-[20px] bg-primary rounded cursor-pointer px-3 py-2 text-white font-semibold w-fit'>Đổi mật khẩu</div>
                        </div>
                    </div>
                    : <LoadingSmall />
                )
            }
        </div>
    )
}

export default UserInfo