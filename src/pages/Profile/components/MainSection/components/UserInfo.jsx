import { useState, useEffect } from 'react'
import LoadingSmall from '../../../../../share/components/LoadingSmall/LoadingSmall'
import instances from '../../../../../utils/plugin/axios';
import { setAccountInfo } from '../../../../../redux/actionSlice/accountSlice'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const UserInfo = (props) => {
    //** State */
    const dispatch = useDispatch()

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [oldPassWord, setOldPassWord] = useState('')
    const [newPassWord, setNewPassWord] = useState('')
    const [newConfirmPass, setNewConfirmPass] = useState('')
    const [validConfirmPass, setValidConfirmPass] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)

    const notifyWarn = () => toast.warn("Vui lòng điền đầy đủ thông tin cần thiết !", {
        pauseOnHover: false,
    });
    const notifyWarnWrongPass = () => toast.warn("Mật khẩu hiện tại không đúng !", {
        pauseOnHover: false,
    });
    const notifyWarnConfirmPass = () => toast.warn("Xác nhận mật khẩu không trùng mật khẩu mới !", {
        pauseOnHover: false,
    });
    const notifySuccess = () => toast.success("Đã cập nhật thông tin", {
        pauseOnHover: false,
    });

    const [updateInfor, setUpdateInfor] = useState({
        accountID: '',
        email: {
            value: '',
            error: false,
        },
        password: {
            value: '',
            error: false,
        },
        firstName: {
            value: '',
            error: false,
        },
        lastName: {
            value: '',
            error: false,
        },
        phoneNumber: {
            value: '',
            error: false,
        },
        address: {
            value: '',
            error: false,
        }
    })

    useEffect(() => {
        setFirstName(props?.data?.firstName || '')
        setLastName(props?.data?.lastName || '')
        setEmail(props?.data?.email || '')
        setPhone(props?.data?.phoneNumber || '')
        setAddress(props?.data?.address || '')
        setUpdateInfor({
            accountID: props?.data?.accountId,
            email: {
                value: props?.data?.email,
                error: false,
            },
            password: {
                value: props?.data?.password,
                error: false,
            },
            firstName: {
                value: props?.data?.firstName,
                error: false,
            },
            lastName: {
                value: props?.data?.lastName,
                error: false,
            },
            phoneNumber: {
                value: props?.data?.phoneNumber,
                error: false,
            },
            address: {
                value: props?.data?.address,
                error: false,
            }
        }
        )
    }, [props?.data])

    //** validate number */
    const handleKeyDown = (e) => {
        if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110
            || e.keyCode === 189) {
            e.preventDefault();
        }
    }

    //** handle update info*/
    const handleUpdateInfo = async (isChangePassword) => {
        if ((firstName !== '') && (lastName !== '') && (email !== '')
            && (phone !== '') && (address !== '')) {
            if (isChangePassword) {
                if (oldPassWord !== props?.data.password) {
                    notifyWarnWrongPass()
                } else {
                    if (newPassWord !== '') {
                        if (newPassWord !== newConfirmPass) {
                            setValidConfirmPass(false)
                            notifyWarnConfirmPass()
                        } else {
                            setValidConfirmPass(true)
                            notifySuccess()
                            // const res = await toast.promise(
                            const res = await instances.put('/accounts/update', {
                                accountID: updateInfor?.accountID,
                                email: updateInfor?.email?.value,
                                password: newConfirmPass,
                                firstName: updateInfor?.firstName?.value,
                                lastName: updateInfor?.lastName?.value,
                                phoneNumber: updateInfor?.phoneNumber?.value,
                                address: updateInfor?.address?.value
                            })
                            if (res?.status === 200) {
                                props?.setUpdateStatus(prev => !prev)
                                dispatch(setAccountInfo({
                                    accountId: updateInfor?.accountID,
                                    address: updateInfor?.address?.value,
                                    firstName: updateInfor?.firstName?.value,
                                    lastName: updateInfor?.lastName?.value,
                                    email: updateInfor?.email?.value,
                                }))
                            }
                            // )
                            // console.log({
                            //     accountID: updateInfor?.accountID,
                            //     email: updateInfor?.email?.value,
                            //     password: newConfirmPass,
                            //     firstName: updateInfor?.firstName?.value,
                            //     lastName: updateInfor?.lastName?.value,
                            //     phoneNumber: updateInfor?.phoneNumber?.value,
                            //     address: updateInfor?.address?.value
                            // });
                        }
                    } else {
                        notifyWarnConfirmPass()
                    }
                }
            } else {
                notifySuccess()
                const res = await instances.put('/accounts/update', {
                    accountID: updateInfor?.accountID,
                    email: updateInfor?.email?.value,
                    password: updateInfor?.password?.value,
                    firstName: updateInfor?.firstName?.value,
                    lastName: updateInfor?.lastName?.value,
                    phoneNumber: updateInfor?.phoneNumber?.value,
                    address: updateInfor?.address?.value
                })
                if (res?.status === 200) {
                    props?.setUpdateStatus(prev => !prev)
                    dispatch(setAccountInfo({
                        accountId: updateInfor?.accountID,
                        address: updateInfor?.address?.value,
                        firstName: updateInfor?.firstName?.value,
                        lastName: updateInfor?.lastName?.value,
                        email: updateInfor?.email?.value,
                    }))
                }
                // console.log({
                //     accountID: updateInfor?.accountID,
                //     email: updateInfor?.email?.value,
                //     password: updateInfor?.password?.value,
                //     firstName: updateInfor?.firstName?.value,
                //     lastName: updateInfor?.lastName?.value,
                //     phoneNumber: updateInfor?.phoneNumber?.value,
                //     address: updateInfor?.address?.value
                // });
            }

        } else {
            notifyWarn()
            if (firstName === '') {
                setUpdateInfor(curr => ({
                    ...curr,
                    firstName: {
                        value: '',
                        error: true,
                    },
                }))
            }
            if (lastName === '') {
                setUpdateInfor(curr => ({
                    ...curr,
                    lastName: {
                        value: '',
                        error: true,
                    },
                }))
            }
            if (email === '') {
                setUpdateInfor(curr => ({
                    ...curr,
                    email: {
                        value: '',
                        error: true,
                    },
                }))
            }
            if (phone === '') {
                setUpdateInfor(curr => ({
                    ...curr,
                    phoneNumber: {
                        value: '',
                        error: true,
                    },
                }))
            }
            if (address === '') {
                setUpdateInfor(curr => ({
                    ...curr,
                    address: {
                        value: '',
                        error: true,
                    },
                }))
            }
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
                                    <div className='flex items-center justify-end gap-4 input-placeholer'>
                                        <span className='text-gray-400 w-[20%] text-right'>Họ</span>
                                        <input
                                            type='text'
                                            value={firstName}
                                            onChange={(e) => {
                                                setFirstName(e.target.value)
                                            }}
                                            onBlur={(e) => {
                                                setUpdateInfor(curr => ({
                                                    ...curr,
                                                    firstName: {
                                                        value: firstName,
                                                        error: false,
                                                    },
                                                }))
                                            }}
                                            className={`w-[80%] py-2 px-3 bg-white rounded border h-[40px]
                                            ${updateInfor.firstName.error ? 'border-red-500' : 'border-gray-400'}
                                            focus:border-primary focus:outline-none`} />
                                    </div>
                                </div>

                                <div className='w-[100%] mb-[20px]'>
                                    <div className='flex items-center justify-end gap-4'>
                                        <span className='text-gray-400 w-[20%] text-right'>Tên</span>
                                        <input
                                            type='text'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            onBlur={(e) => {
                                                setUpdateInfor(curr => ({
                                                    ...curr,
                                                    lastName: {
                                                        value: lastName,
                                                        error: false,
                                                    },
                                                }))
                                            }}
                                            className={`w-[80%] py-2 px-3 bg-white rounded border h-[40px]
                                            ${updateInfor.lastName.error ? 'border-red-500' : 'border-gray-400'}
                                            focus:border-primary focus:outline-none`} />
                                    </div>
                                </div>

                                <div className='w-[100%] mb-[20px]'>
                                    <div className='flex items-center justify-end gap-4'>
                                        <span className='text-gray-400 w-[20%] text-right'>Email</span>
                                        <input
                                            type='text'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={(e) => {
                                                setUpdateInfor(curr => ({
                                                    ...curr,
                                                    email: {
                                                        value: email,
                                                        error: false,
                                                    },
                                                }))
                                            }}
                                            className={`w-[80%] py-2 px-3 bg-white rounded border h-[40px]
                                            ${updateInfor.email.error ? 'border-red-500' : 'border-gray-400'}
                                            focus:border-primary focus:outline-none`} />
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
                                            onBlur={(e) => {
                                                setUpdateInfor(curr => ({
                                                    ...curr,
                                                    phoneNumber: {
                                                        value: phone,
                                                        error: false,
                                                    },
                                                }))
                                            }}
                                            onKeyDown={handleKeyDown}
                                            className={`w-[80%] py-2 px-3 bg-white rounded border h-[40px]
                                            ${updateInfor.phoneNumber.error ? 'border-red-500' : 'border-gray-400'}
                                            focus:border-primary focus:outline-none`} />
                                    </div>
                                </div>

                                <div className='w-[100%] mb-[20px]'>
                                    <div className='flex items-center justify-end gap-4'>
                                        <span className='text-gray-400 w-[20%] text-right'>Địa chỉ</span>
                                        <input
                                            type='text'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            onBlur={(e) => {
                                                setUpdateInfor(curr => ({
                                                    ...curr,
                                                    address: {
                                                        value: address,
                                                        error: false,
                                                    },
                                                }))
                                            }}
                                            className={`w-[80%] py-2 px-3 bg-white rounded border h-[40px]
                                            ${updateInfor.address.error ? 'border-red-500' : 'border-gray-400'}
                                            focus:border-primary focus:outline-none`} />
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className='w-full flex justify-end'>
                            <div
                                onClick={() => handleUpdateInfo()}
                                className='select-none my-[20px] bg-primary rounded cursor-pointer px-3 py-2 text-white font-semibold w-fit'>Cập nhật thông tin</div>
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
                                <span className='text-gray-400 w-[20%] text-right'>Mật khẩu hiện tại</span>
                                <input
                                    type='password'
                                    value={oldPassWord}
                                    onChange={(e) => setOldPassWord(e.target.value)}
                                    onBlur={(e) => setOldPassWord(e.target.value)}
                                    className={`w-[80%] py-2 px-3 bg-white rounded border h-[40px]
                                            ${updateInfor.password.error ? 'border-red-500' : 'border-gray-400'}
                                            focus:border-primary focus:outline-none`} />
                            </div>
                        </div>

                        <div className='w-[49%] mb-[20px]'>
                            <div className='flex items-center justify-end gap-4'>
                                <span className='text-gray-400 w-[20%] text-right'>Mật khẩu mới</span>
                                <input
                                    type='password'
                                    value={newPassWord}
                                    onChange={(e) => setNewPassWord(e.target.value)}
                                    onBlur={(e) => setNewPassWord(e.target.value)}
                                    className={`w-[80%] py-2 px-3 bg-white rounded border h-[40px]
                                            ${updateInfor.password.error ? 'border-red-500' : 'border-gray-400'}
                                            focus:border-primary focus:outline-none`} />
                            </div>
                        </div>

                        <div className='w-[49%] mb-[20px]'>
                            <div className='flex items-center justify-end gap-4'>
                                <span className='text-gray-400 w-[20%] text-right'>Xác nhận mật khẩu mới</span>
                                <input
                                    type='password'
                                    value={newConfirmPass}
                                    onChange={(e) => {
                                        setNewConfirmPass(e.target.value)
                                    }}
                                    onBlur={(e) => {
                                        if (e.target.value === newPassWord) {
                                            setUpdateInfor(curr => ({
                                                ...curr,
                                                password: {
                                                    value: e.target.value,
                                                    error: false,
                                                },
                                            }))
                                        }
                                        setNewConfirmPass(e.target.value)
                                    }}
                                    className={`w-[80%] py-2 px-3 bg-white rounded border h-[40px]
                                            ${updateInfor.password.error ? 'border-red-500' : 'border-gray-400'}
                                            focus:border-primary focus:outline-none`} />
                            </div>
                        </div>

                        <div className='flex w-full justify-end'>
                            <div
                                onClick={() => handleUpdateInfo(true)}
                                className='select-none mb-[20px] bg-primary rounded cursor-pointer px-3 py-2 text-white font-semibold w-fit'>Đổi mật khẩu</div>
                        </div>
                    </div>
                    : <LoadingSmall />
                )
            }
        </div>
    )
}

export default UserInfo