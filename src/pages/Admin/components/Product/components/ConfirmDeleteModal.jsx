import { useState, useEffect } from 'react'
import instances from '../../../../../utils/plugin/axios';

import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { toast } from 'react-toastify';

const ConfirmDeleteModal = (props) => {
    //**  handle close modal  */
    const handleColseModal = () => {
        props?.setIsShowDeleteModal(false)
    }

    //** handle confirm delete  */
    const handleConfirmDelete = () => {
        // console.log(props?.data.productId);
        toast.promise(
            instances.delete('/products', {
                params: {
                    proid: props?.data.productId
                }
            }).then(() => {
                props?.setUpdateTable(prev => !prev)
                handleColseModal()
            }),
            {
                pending: 'Đang xóa sản phẩm',
                success: 'Đã xóa thành công! 👌',
                error: 'Xóa sản phẩm thất bại'
            }
        )
    }

    //** handle confirm restore  */
    const handleConfirmRestore = () => {
        // console.log(props?.data.productId);
        toast.promise(
            instances.put(`/admin/changestatusproduct/${props?.data.productId}/true`)
                .then(() => {
                    props?.setUpdateTable(prev => !prev)
                    handleColseModal()
                }),
            {
                pending: 'Đang phục hồi sản phẩm',
                success: 'Đã phục hồi thành công! 👌',
                error: 'Phục hồi sản phẩm thất bại'
            }
        )
    }

    return (
        <div>
            <div
                onClick={() => handleColseModal()}
                className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[900]' />
            <div className='sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>
                <div className='font-maven p-5 w-max'>
                    <div className='text-redError pb-2 border-b border-gray-300 flex items-center gap-2'>
                        <p className='font-semibold text-[20px] '>Ẩn sản phẩm khỏi cửa hàng</p>
                        <ArchiveOutlinedIcon />
                    </div>
                    <div className='mt-5'>
                        <p className='mb-4 text-redError'>Xác nhận ẩn <span className='font-medium italic'>{props?.data?.productName}</span> ?</p>
                        <div className='flex gap-4'>
                            <img loading='lazy' className='w-[120px] h-[120px] object-cover rounded' src={`data:image/webp;base64,${props?.data?.image || ''}`} />
                            <div>
                                <p className='font-medium text-gray-500 mb-2'>Danh mục: <span className='font-normal'>{props?.data?.categoryName}</span></p>
                                <p className='font-medium text-gray-500 mb-2'>Giá gốc: <span className='font-normal'>{props?.data?.originalPrice}</span></p>
                                <p className='font-medium text-gray-500 mb-2'>Giá bán: <span className='font-normal'>{props?.data?.salePrice}</span></p>
                                <p className='font-medium text-gray-500 mb-2'>SL đã bán: <span className='font-normal'>{props?.data?.soldQuantity}</span></p>
                            </div>
                        </div>

                    </div>

                    {
                        props?.data.status === 'AVAILABLE' &&
                        <div
                            onClick={() => handleConfirmDelete()}
                            className='bg-redError px-4 py-2 text-center text-white rounded-[5px] cursor-pointer font-semibold mt-8'>
                            Xác nhận
                        </div>
                    }

                    {
                        props?.data.status === 'OUT_OF_STOCK' &&
                        <div
                            onClick={() => handleConfirmRestore()}
                            className='bg-green-500 px-4 py-2 text-center text-white rounded-[5px] cursor-pointer font-semibold mt-8'>
                            Phục hồi
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal