import { useState, useEffect } from 'react'
import instances from '../../../../../utils/plugin/axios';
import LoadingSmall from '../../../../../share/components/LoadingSmall/LoadingSmall';
import numberWithCommas from '../../../../../utils/numberWithComma';
import truncate from '../../../../../utils/truncate';
import { clearProductDetail, openProductDetails } from '../../../../../redux/actionSlice/productSlice';

//** images */
import { emptyUserOrder } from '../../../../../assets/images';

//** third party libraries*/
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const OrderTracking = (props) => {

    //** State */
    const dispatch = useDispatch()
    const [status, setStatus] = useState('PENDING')
    const [orderList, setOrderList] = useState([])
    const accountID = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
    const [confirmShipOrder, setConfirmShipOrder] = useState(false)
    const [openModalFeedback, setOpenModalFeedback] = useState(false)
    const [feedBack, setFeedBack] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (event, newValue) => {
        setStatus(newValue);
    };

    // ** get order list **
    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get(`/user/orders/${accountID.accountId}/${status}`, {
                params: {
                    userid: accountID.accountId,
                    status: status
                }
            })
            setOrderList(res?.data?.result)
        }

        fetch()
    }, [status, confirmShipOrder])

    // ** confirm shipped order
    const handleConfirm = async (orderId) => {
        await instances.put(`/changestatusorder/${orderId}`)
        setConfirmShipOrder(prev => !prev)
    }

    //** confirm send feedBack */
    const handleConfirmFeedBack = (data) => {
        if (data !== '') {
            // await instances.put(`/changestatusorder/${props?.orderDetail?.orderID}?reason=${data}`)
            setOpenModalFeedback(false)
            setError(false)
        } else {
            setError(true)
        }
    }

    //** handle Open detail 
    const handleOpenDetail = async (categoryId, productId) => {
        dispatch(openProductDetails({
            productId: productId,
            categoryId: categoryId
        }))
    }

    return (
        <div className='font-maven'>
            {
                openModalFeedback &&
                <div>
                    <div
                        onClick={() => setOpenModalFeedback(false)}
                        className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.5)] fixed z-[995]' />
                    <div className='fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] 
                z-[999] rounded shadow-lg bg-white px-3 py-4 w-[300px]'>
                        <p className='text-[18px] text-center font-semibold '>Nhập đánh giá</p>
                        <textarea
                            onBlur={(e) => setFeedBack(e.target.value)}
                            rows="4" className={`my-3 p-2.5 w-full text-gray-900 bg-white rounded border ${error ? 'border-red-500' : 'border-gray-500'}
                focus:outline-none focus:bg-white focus:border-primary  resize-none`} placeholder="Nhập feedback tại đây..."></textarea>
                        <div
                            onClick={() => handleConfirmFeedBack(feedBack)}
                            className='bg-primary rounded-[5px] text-center cursor-pointer px-4 py-2 text-white font-semibold'>Xác nhận</div>
                    </div>
                </div>
            }
            <div className='rounded border shadow-lg'>
                <Tabs
                    value={status}
                    onChange={handleChange}
                    variant="fullWidth"
                // centered
                >
                    <Tab label="Chờ xác nhận" value='PENDING' icon={<AccessTimeIcon />} iconPosition="end" />
                    <Tab label="Đang giao" value='SHIPPING' icon={<LocalShippingIcon />} iconPosition="end" />
                    <Tab label="Đã giao" value='SHIPPED' icon={<AssignmentTurnedInIcon />} iconPosition="end" />
                    {/* <Tab label="Đã mua" icon={<TaskAltIcon />} iconPosition="end" /> */}
                    <Tab label="Đã từ chối" value='CANCELED' icon={<CancelIcon />} iconPosition="end" />
                </Tabs>
            </div>

            <div className='rounded border shadow-md max-h-[60vh] h-[60vh] scroll-bar overflow-x-hidden overflow-y-scroll mt-5'>
                {
                    orderList?.length > 0 ?
                        <div className='w-full h-full '>
                            {
                                orderList?.map((item) => (
                                    <div key={item.orderId} className='flex gap-[100px]  px-7 py-5 border-b border-dashed '>

                                        <div className='w-[40%] max-h-[260px] scroll-bar overflow-x-hidden overflow-y-scroll text-gray-700'>
                                            {
                                                item.productList.map((product, index) => (
                                                    <div key={index} className='flex gap-3 mb-2'>
                                                        <img loading='lazy' className='w-[150px] h-[150px] rounded object-cover' src={`data:image/webp;base64,${product.image || ''}`} />
                                                        <div className='leading-6 relative'>
                                                            <p className='font-medium '>{truncate(product.productName, 30)}</p>
                                                            <p className='font-medium'>Danh mục: <span className='font-normal'>{product.categoryName}</span></p>
                                                            <p className='font-medium'>Số lượng: <span className='font-normal'>{product.quantityBuy}</span></p>

                                                            <div className=' gap-2 items-center'>
                                                                <p className='font-medium mt-2'>
                                                                    <span className='font-normal text-primary'>{numberWithCommas(product.salePrice)}đ</span>
                                                                    <span className='font-normal line-through ml-2 text-[14px] text-gray-400'>{numberWithCommas(product.originalPrice)}đ</span>
                                                                </p>
                                                                {
                                                                    item.status == 'SHIPPED' &&

                                                                    <div className='mt-3 flex gap-2'>
                                                                        <div
                                                                            onClick={() => setOpenModalFeedback(true)}
                                                                            className='w-fit uppercase bg-primary rounded px-3 
                                                                        py-1 cursor-pointer text-center text-white text-[14px] font-medium'>Gửi đánh giá</div>
                                                                        <Link to={'/products/detail/' + product.productName}
                                                                            onClick={() => handleOpenDetail(product.categoryId, product.productId)}
                                                                        >
                                                                            <div className='w-fit uppercase bg-green-500 rounded px-3 
                                                                        py-1 cursor-pointer text-center text-white text-[14px] font-medium'>Mua lại</div>
                                                                        </Link>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className='flex-1 relative text-gray-700'>
                                            <>
                                                <p className='text-[18px] font-semibold'>Thông tin người nhận</p>
                                                <div className='px-3'>
                                                    <p className='font-medium my-2'>Họ tên: <span className='font-normal'>{item.customerName}</span></p>
                                                    <p className='font-medium my-2'>Địa chỉ nhận hàng: <span className='font-normal'>{item.address}</span></p>
                                                    <p className='font-medium my-2'>Chi nhánh giao hàng: <span className='font-normal'>{item.agencyName}</span></p>
                                                    <p className='font-medium my-2'>Ghi chú: <span className='font-normal'>{item.notes}</span></p>

                                                    <p className='text-[18px] mt-6 text-primary font-medium'>Tổng đơn hàng: <span>{numberWithCommas(item.total)} đ</span></p>
                                                </div>
                                            </>
                                            <div className='absolute top-0 right-0'>
                                                <div>
                                                    <EventNoteIcon /> {item.orderDate}
                                                </div>
                                                <p className='mt-3'>Trạng thái:
                                                    {
                                                        item.status == 'PENDING' && <span className=''>Chờ xác nhận</span>
                                                    }
                                                    {
                                                        item.status == 'SHIPPING' && <span className='text-green-500'>Đang giao</span>
                                                    }
                                                    {
                                                        item.status == 'SHIPPED' && <span className='text-yellow-500'>Đã giao</span>
                                                    }
                                                    {
                                                        item.status == 'CANCELED' && <span className='text-red-500'>Đã hủy</span>
                                                    }
                                                </p>
                                                {
                                                    item.status == 'CANCELED' &&
                                                    <p className='mt-3'>Lý do: {item?.reason}</p>
                                                }
                                            </div>
                                            {
                                                item.status == 'SHIPPING' &&
                                                <div className='absolute bottom-0 right-0 w-[150px]'>
                                                    <div
                                                        onClick={() => handleConfirm(item.orderId)}
                                                        className='bg-green-500 w-fit rounded cursor-pointer text-white font-medium px-3 py-2'>Đã nhận hàng</div>
                                                    <p className='text-[13px] text-redError leading-4 mt-2'>Xác nhận đã nhận được hàng và đã thanh toán</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        : <div className='w-full h-full flex-col gap-2 flex justify-center items-center'>
                            <div className='w-[60px] h-[60px] bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${emptyUserOrder})` }} />
                            <p className='font-medium text-[15px]'>Chưa có đơn hàng</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default OrderTracking