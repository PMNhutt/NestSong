import { useEffect, useState } from 'react'
import instances from '../../../../../../utils/plugin/axios'
import LoadingSmall from '../../../../../../share/components/LoadingSmall/LoadingSmall'
import { updateStaffList } from '../../../../../../redux/actionSlice/managementSlice'

import { toast } from 'react-toastify';
import { MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useDispatch } from 'react-redux';

const UpdateModal = (props) => {

    //** States */
    const dispatch = useDispatch()
    const [agencyList, setAgencyList] = useState('')
    const [agencySelect, setAgencySelect] = useState(props?.data.address || '')
    const [name, setName] = useState(props?.data.name || '')
    const [email, setEmail] = useState(props?.data.email || '')
    const [password, setPassword] = useState(props?.data.password || '')
    const [lastName, setLastName] = useState(props?.data.lastName || '')
    const [firstName, setFirstName] = useState(props?.data.firstName || '')

    const [updateInfor, setUpdateInfor] = useState({
        accountID: props?.data.accountId,
        agencyID: {
            value: props?.data?.agencyId,
            error: false
        },
        email: {
            value: props?.data.email,
            error: false,
        },
        password: {
            value: props?.data.password,
            error: false,
        },
        firstName: {
            value: props?.data?.firstName,
            error: false
        },
        lastName: {
            value: props?.data?.lastName,
            error: false
        },

    })
    const notifyWarn = () => toast.warn("Vui lòng điền đầy đủ thông tin cần thiết !", {
        pauseOnHover: false,
    });
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    // useEffect(() => {
    //     console.log(props?.data);
    //     console.log(updateInfor);
    // }, [props?.data])

    //** handle close modal */
    const handleColseModal = () => {
        props?.setShowEditModal(false)
    }

    //** handle select category */
    const handleAgencyChange = (e) => {
        setAgencyList(e.target.value)
        setUpdateInfor(curr => ({
            ...curr,
            agencyID: {
                value: e.target.value,
                error: false
            }
        }))
    }

    //** handle change staff status **//
    const handleBanStaff = () => {
        toast.promise(
            instances.put(`/admin/changestatusstaff?staff_id=${props?.data.accountId}&status=${props?.data.status == 'VALID' ? 'INVALID' : 'VALID'}`
            ).then(() => {
                dispatch(updateStaffList())
                handleColseModal()
            }),
            {
                pending: 'Đang cập nhật thông tin',
                success: 'Đã cập nhật thành công! 👌',
                error: 'Cập nhật sản phẩm thất bại'
            }
        )
    }

    //** handle confirm update staff */
    const handleUpdate = async () => {
        if ((email !== "") && (firstName !== "") && (lastName !== "")
            && (password !== "")) {

            await instances.put(`/admin/changeagencyid?staff_id=${props?.data.accountId}&agencyid=${updateInfor?.agencyID?.value}`)
            toast.promise(
                instances.put('/accounts/update', {
                    accountID: updateInfor?.accountID,
                    email: updateInfor?.email?.value,
                    password: updateInfor?.password?.value,
                    firstName: updateInfor?.firstName?.value,
                    lastName: updateInfor?.lastName?.value,
                    phoneNumber: props?.data.phoneNumber,
                    address: props?.data.address
                }).then(() => {
                    dispatch(updateStaffList())
                    handleColseModal()
                }),
                {
                    pending: 'Đang cập nhật thông tin',
                    success: 'Đã cập nhật thành công! 👌',
                    error: 'Cập nhật sản phẩm thất bại'
                }
            )
            // console.log({
            //     accountID: updateInfor?.accountID,
            //     agencyID: updateInfor?.agencyID?.value,
            //     email: updateInfor?.email?.value,
            //     password: updateInfor?.password?.value,
            //     firstName: updateInfor?.firstName?.value,
            //     lastName: updateInfor?.lastName?.value,
            //     phoneNumber: props?.data.phoneNumber,
            //     address: props?.data.address
            // })
        } else {
            notifyWarn()
            if (email == "") {
                setUpdateInfor(curr => ({
                    ...curr,
                    email: {
                        value: '',
                        error: true
                    }
                }))
            }
            if (firstName == "") {
                setUpdateInfor(curr => ({
                    ...curr,
                    firstName: {
                        value: '',
                        error: true
                    }
                }))
            }
            if (lastName == "") {
                setUpdateInfor(curr => ({
                    ...curr,
                    lastName: {
                        value: '',
                        error: true
                    }
                }))
            }
            if (password == "") {
                setUpdateInfor(curr => ({
                    ...curr,
                    password: {
                        value: '',
                        error: true
                    }
                }))
            }
        }
    }

    return (
        <div>
            <div
                onClick={() => handleColseModal()}
                className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[900]' />
            <div className='sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>
                <div className='font-maven p-5'>

                    <div className='pb-3 text-primary border-b border-gray-300 flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <p className='font-semibold text-[20px] '>Chỉnh sửa thông tin</p>
                            <BorderColorIcon />
                        </div>
                        <div
                            onClick={() => handleColseModal()}
                            className='text-redError cursor-pointer p-1'>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className='w-full'>

                        <div className='gap-3 w-full md:flex-nowrap flex-wrap mb-2'>
                            <p className='text-gray-400 mb-2'>Chi nhánh</p>
                            <Select
                                displayEmpty
                                disableUnderline
                                value={agencyList}
                                onChange={handleAgencyChange}
                                MenuProps={MenuProps}
                                renderValue={
                                    agencySelect !== '' ? () => <p>{agencySelect}</p> : () => <p>Chọn danh mục</p>
                                }
                                variant="standard"
                                className={`bg-white border 
                                                border-gray-400
                                                rounded px-3 w-full`}
                            >
                                {
                                    props?.listAgency?.length > 0 ?
                                        props?.listAgency?.map((cate) =>
                                            <MenuItem
                                                key={cate.agencyId}
                                                value={cate.agencyId}
                                                onClick={(e) => setAgencySelect(e.target.innerText)}
                                                className="menu-item">
                                                <p className="item-label font-maven">
                                                    {cate.address}
                                                </p>
                                            </MenuItem>
                                        ) :
                                        <MenuItem disabled value='' className="menu-item">
                                            <em>Không tìm thấy dữ liệu</em>
                                        </MenuItem>
                                }
                            </Select>
                        </div>
                        <div className='w-[100%] items-center flex gap-4 mt-3'>

                            <div className='mb-2 w-full'>
                                <div className=''>
                                    <p className='text-gray-400 mb-2'>Họ</p>
                                    <input
                                        type='text'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        onBlur={() => setUpdateInfor(curr => ({
                                            ...curr,
                                            firstName: {
                                                value: firstName,
                                                error: false
                                            }
                                        }))}
                                        className={`w-full py-2 px-3 bg-white rounded border h-[40px]
                                        ${updateInfor.firstName.error ? 'border-red-500' : 'border-gray-400'}
                                                focus:border-primary focus:outline-none`} />
                                </div>
                            </div>

                            <div className='mb-2 w-full'>
                                <div className=''>
                                    <p className='text-gray-400 mb-2'>Tên</p>
                                    <input
                                        type='text'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        onBlur={() => setUpdateInfor(curr => ({
                                            ...curr,
                                            lastName: {
                                                value: lastName,
                                                error: false
                                            }
                                        }))}
                                        className={`w-full py-2 px-3 bg-white rounded border h-[40px]
                                        ${updateInfor.lastName.error ? 'border-red-500' : 'border-gray-400'}
                                                focus:border-primary focus:outline-none`} />
                                </div>
                            </div>
                        </div>

                        <div className='w-[100%] flex gap-4'>
                            <div className='mb-2'>
                                <div className=''>
                                    <p className='text-gray-400 mb-2'>Email</p>
                                    <input
                                        type='text'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => setUpdateInfor(curr => ({
                                            ...curr,
                                            email: {
                                                value: email,
                                                error: false
                                            }
                                        }))}
                                        className={`w-full py-2 px-3 bg-white rounded border h-[40px]
                                        ${updateInfor.email.error ? 'border-red-500' : 'border-gray-400'}
                                                focus:border-primary focus:outline-none`} />
                                </div>
                            </div>

                            <div className='mb-2'>
                                <div className=''>
                                    <p className='text-gray-400 mb-2'>Mật khẩu</p>
                                    <input
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={() => setUpdateInfor(curr => ({
                                            ...curr,
                                            password: {
                                                value: password,
                                                error: false
                                            }
                                        }))}
                                        className={`w-full py-2 px-3 bg-white rounded border h-[40px]
                                        ${updateInfor.password.error ? 'border-red-500' : 'border-gray-400'}
                                                focus:border-primary focus:outline-none`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-3 w-full mt-6'>
                        <div
                            onClick={() => handleUpdate()}
                            className='w-full bg-primary px-3 py-2 rounded text-center text-white font-medium cursor-pointer'>Cập nhật</div>
                        <div
                            onClick={() => handleBanStaff()}
                            className={`w-full ${props?.data.status == 'VALID' ? 'bg-redError' : 'bg-green-500'} px-3 py-2 rounded text-center text-white font-medium cursor-pointer`}>
                            {props?.data.status == 'VALID' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UpdateModal