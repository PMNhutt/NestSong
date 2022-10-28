import { useState, useEffect, useRef } from 'react'
import LoadingSmall from '../../../../../share/components/LoadingSmall/LoadingSmall'
import numberWithCommas from '../../../../../utils/numberWithComma'
import instances from '../../../../../utils/plugin/axios'

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const ViewDetailOrder = (props) => {

    //** State */
    const [isOpenCancel, setIsOpenCancel] = useState(false)
    const [cancelReason, setCancelReason] = useState('')
    const [error, setError] = useState(false)

    //** get total price */
    const calculateTotalPrice = () => {
        let total = 0
        if (props?.orderDetail?.products?.length > 0) {
            props?.orderDetail?.products.forEach(pro => {
                total += pro.total
            });
        }
        return total
    }
    const handleInputReas = (e) => {
        setCancelReason(e.target.value)
        // console.log(e.target.value);
    }

    //** handle open modal cancel order */
    const handleOpenCancelModal = () => {
        setIsOpenCancel(true)
    }

    //** handle confirm order and change status to shiping order */
    const handleConfirmOrder = () => {
        props?.setStatusChange(prev => !prev)
        props.setIsShowModal(false)
    }

    //** handle confirm cancel order */
    const handleConfirmCancel = (data) => {
        if (data !== '') {
            setIsOpenCancel(false)
            props?.setStatusChange(prev => !prev)
            props.setIsShowModal(false)
            setError(false)
            console.log(data);
        } else {
            setError(true)
        }
    }

    return (
        <div>
            {
                isOpenCancel &&
                <div>
                    <div
                        onClick={() => setIsOpenCancel(false)}
                        className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.5)] fixed z-[995]' />
                    <div className='fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] 
                z-[999] rounded shadow-lg bg-white px-3 py-4 w-[300px]'>
                        <p className='text-[18px] text-center font-semibold '>Nhập lý do</p>
                        <textarea
                            onBlur={handleInputReas}
                            // value={cancelReason}
                            // onChange={handleInputReas}
                            rows="4" className={`my-3 p-2.5 w-full text-gray-900 bg-white rounded border ${error ? 'border-red-500' : 'border-gray-500'}
                focus:outline-none focus:bg-white focus:border-primary  resize-none`} placeholder="Thông tin không hợp lệ..."></textarea>
                        <div
                            onClick={() => handleConfirmCancel(cancelReason)}
                            className='bg-red-500 rounded-[5px] text-center cursor-pointer px-4 py-2 text-white font-semibold'>Từ chối đơn hàng</div>
                    </div>
                </div>
            }

            <div
                onClick={() => props.setIsShowModal(false)}
                className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[900]' />
            <div className='sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>

                <div className='font-maven p-5'>
                    <div className='text-primary pb-2 border-b border-gray-300 flex items-center gap-2'>
                        <p className='font-semibold text-[20px]'>Chi tiết đơn hàng</p>
                        <AssignmentOutlinedIcon />
                    </div>
                    {
                        props?.orderDetail ?
                            <>
                                <div className='flex gap-[30px] mt-5'>
                                    <div className='info w-[300px]'>
                                        <p className='font-medium mb-3'>Chi nhánh: <span className='font-normal'>{props?.orderDetail?.agency}</span></p>
                                        <p className='font-medium mb-3'>Khách hàng: <span className='font-normal'>{props?.orderDetail?.customerName}</span></p>
                                        <p className='font-medium mb-3'>SĐT: <span className='font-normal'>{props?.orderDetail?.phonenumber}</span></p>
                                        <p className='font-medium mb-3'>Email: <span className='font-normal'>{props?.orderDetail?.email}</span></p>
                                        <p className='font-medium mb-3'>Địa chỉ: <span className='font-normal'>{props?.orderDetail?.address}</span></p>
                                        <p className='font-medium mb-3'>Ghi chú: <span className='font-normal'>{props?.orderDetail?.notes === "" ? 'Không có ghi chú' : props?.orderDetail?.notes}</span></p>
                                    </div>
                                    <div className='items w-[300px]'>
                                        <div className='max-h-[270px] scroll-bar overflow-x-hidden overflow-y-scroll'>
                                            {
                                                props?.orderDetail?.products?.length > 0 &&
                                                props?.orderDetail?.products?.map((product, index) => (
                                                    <div key={index} className='flex items-center gap-3 mb-3'>
                                                        <img loading='lazy' className='w-[120px] h-[120px] object-cover' src={`data:image/webp;base64,${product?.image || ''}`} />
                                                        <div className=''>
                                                            <p className='font-medium '>{product?.productName}</p>
                                                            <p className='text-[14px] text-gray-500 mb-2'>{product?.categoryName}</p>
                                                            <p className='text-[14px] text-primary'>{numberWithCommas(product?.salePrice)}đ <span className='text-black'>x{product.quantityBuy}</span></p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>

                                <p className='font-medium text-center text-[18px] mt-7'>Tổng đơn hàng: <span className='font-normal'>{numberWithCommas(calculateTotalPrice())} đ</span></p>

                                <div className='w-full flex gap-5 mt-10 justify-center'>
                                    <div
                                        onClick={() => handleConfirmOrder()}
                                        className='bg-green-500 rounded-[5px] cursor-pointer px-4 py-2 text-white font-semibold'>Xác nhận giao hàng</div>
                                    <div
                                        onClick={() => handleOpenCancelModal()}
                                        className='bg-red-500 rounded-[5px] cursor-pointer px-4 py-2 text-white font-semibold'>Từ chối đơn hàng</div>
                                </div>
                            </>
                            : <LoadingSmall />
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewDetailOrder