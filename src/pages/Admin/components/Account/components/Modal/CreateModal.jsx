import { useState, useEffect } from 'react'
import { updateStaffList } from '../../../../../../redux/actionSlice/managementSlice'
import instances from '../../../../../../utils/plugin/axios';

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const CreateModal = (props) => {

    //** States */
    const dispatch = useDispatch()
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
    const Placeholder = ({ children }) => {
        return <div className='text-gray-400'>{children} <span className='text-redError text-[18px] font-semibold'>*</span></div>;
    };
    const [agencies, setAgencies] = useState('')
    const [agencyList, setAgencyList] = useState('')

    //** validate number */
    const handleKeyDown = (e, percentVal) => {
        if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110
            || e.keyCode === 189) {
            e.preventDefault();
        }
        // if (percentVal) {
        //     if (percentValid || priceValid) {
        //         if ((e.keyCode !== 8 && e.keyCode !== 46)) {
        //             e.preventDefault();
        //         }
        //     }
        // }
    }

    //** handle close modal **/
    const handleCloseCreateModal = () => {
        props?.setShowCreateModal(false)
    }

    //** handle change agency */
    const handleAgencyChange = (e) => {
        setAgencies(e.target.value)
        setAgencyList(e.target.value)
        props?.handleAgencyChange(e.target.value)
    }

    //** handle create staff */
    const handleCreateStaff = async () => {
        if ((props?.createInfo?.agencyId?.value !== "") &&
            (props?.createInfo?.firstName?.value !== "") &&
            (props?.createInfo?.lastName?.value !== "") &&
            (props?.createInfo?.email?.value !== "") &&
            (props?.createInfo?.phoneNumber?.value !== "") &&
            (props?.createInfo?.address?.value !== "") &&
            (props?.createInfo?.password?.value !== "")) {

            toast.promise(
                instances.post('/admin/createstaff', {
                    agencyID: props.createInfo.agencyId?.value,
                    firstName: props.createInfo.firstName.value,
                    lastName: props.createInfo.lastName.value,
                    phoneNumber: props.createInfo.phoneNumber.value,
                    address: props.createInfo.address.value,
                    email: props.createInfo.email.value,
                    password: props.createInfo.password.value
                }).then(() => {
                    // props?.setUpdateTable(prev => !prev)
                    // handleCloseCreateModal()
                    handleCloseCreateModal()
                    dispatch(updateStaffList())
                }),
                {
                    pending: 'Đang thêm nhân viên',
                    success: 'Đã thêm thành công! 👌',
                    error: 'Thêm thất bại'
                }
            )
            // console.log({
            //     agencyId: props.createInfo.agencyId,
            //     firstName: props.createInfo.firstName,
            //     lastName: props.createInfo.lastName,
            //     phoneNumber: props.createInfo.phoneNumber,
            //     address: props.createInfo.address,
            //     email: props.createInfo.email,
            //     password: props.createInfo.password
            // })

        } else {
            notifyWarn()
            if (props?.createInfo?.agencyId?.value == "") {
                props?.setCreateInfo(curr => ({
                    ...curr,
                    agencyId: {
                        value: '',
                        error: true
                    }
                }))
            }
            if (props?.createInfo?.firstName?.value == "") {
                props?.setCreateInfo(curr => ({
                    ...curr,
                    firstName: {
                        value: '',
                        error: true
                    }
                }))
            }
            if (props?.createInfo?.lastName?.value == "") {
                props?.setCreateInfo(curr => ({
                    ...curr,
                    lastName: {
                        value: '',
                        error: true
                    }
                }))
            }
            if (props?.createInfo?.phoneNumber?.value == "") {
                props?.setCreateInfo(curr => ({
                    ...curr,
                    phoneNumber: {
                        value: '',
                        error: true
                    }
                }))
            }
            if (props?.createInfo?.address?.value == "") {
                props?.setCreateInfo(curr => ({
                    ...curr,
                    address: {
                        value: '',
                        error: true
                    }
                }))
            }
            if (props?.createInfo?.email?.value == "") {
                props?.setCreateInfo(curr => ({
                    ...curr,
                    email: {
                        value: '',
                        error: true
                    }
                }))
            }
            if (props?.createInfo?.password?.value == "") {
                props?.setCreateInfo(curr => ({
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
                onClick={() => handleCloseCreateModal()}
                className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[900]' />
            <div className='sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>
                <div className='font-maven p-5'>

                    <div className='text-primary pb-2 border-b border-gray-300 flex justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <p className='font-semibold text-[20px] p-1'>Thêm mới nhân viên</p>
                            <PersonAddAlt1Icon />
                        </div>
                        <div
                            onClick={() => handleCloseCreateModal()}
                            className='text-redError cursor-pointer'>
                            <CloseIcon />
                        </div>
                    </div>

                    <div className='flex mt-4 gap-3 w-full md:flex-nowrap flex-wrap mb-2'>
                        <Select
                            displayEmpty
                            disableUnderline
                            value={agencyList}
                            onChange={handleAgencyChange}
                            MenuProps={MenuProps}
                            renderValue={
                                agencies !== '' ? undefined : () => <Placeholder>Chọn chi nhánh</Placeholder>
                            }
                            variant="standard"
                            className={`bg-white border ${props?.createInfo?.agencyId.error ? 'border-red-500' : 'border-gray-400'} rounded px-3 w-full`}
                        >
                            {
                                props?.listAgency?.length > 0 ?
                                    props?.listAgency?.map((cate) =>
                                        <MenuItem key={cate.agencyId} value={cate.agencyId} className="menu-item">
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

                    <div className='flex gap-3'>

                        <div className="flex gap-2 mb-2 relative input-placeholer">
                            <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.firstName.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                                required type="text"
                                onBlur={(e) => props?.handleInputFirstName(e.target.value)}
                            />
                            <div className='placeholder'>
                                Họ <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-2 relative input-placeholer">
                            <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.lastName.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                                required type="text"
                                onBlur={(e) => props?.handleInputLastName(e.target.value)}
                            />
                            <div className='placeholder'>
                                Tên <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
                            </div>
                        </div>

                    </div>

                    <div className='flex gap-3'>

                        <div className="flex gap-2 mb-2 relative input-placeholer">
                            <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.phoneNumber.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                                required type="number"
                                onKeyDown={handleKeyDown}
                                onBlur={(e) => props?.handleInputPhoneNumber(e.target.value)}
                            />
                            <div className='placeholder'>
                                SDT <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-2 relative input-placeholer">
                            <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.address.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                                required type="text"
                                onBlur={(e) => props?.handleInputAddress(e.target.value)}
                            />
                            <div className='placeholder'>
                                Địa chỉ <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
                            </div>
                        </div>

                    </div>


                    <div className="mb-2 relative input-placeholer">
                        <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.email.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                            required type="text"
                            onBlur={(e) => props?.handleInputEmail(e.target.value)}
                        />
                        <div className='placeholder'>
                            Email <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
                        </div>
                    </div>

                    <div className="mb-2 relative input-placeholer">
                        <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.password.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                            required type="password"
                            onBlur={(e) => props?.handleInputPassword(e.target.value)}
                        />
                        <div className='placeholder'>
                            Mật khẩu <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
                        </div>
                    </div>

                    <div
                        onClick={() => handleCreateStaff()}
                        className={`bg-primary select-none cursor-pointer py-2 px-4 rounded text-white text-center mt-4`}>Xác nhận</div>

                </div>
            </div>
        </div>
    )
}

export default CreateModal