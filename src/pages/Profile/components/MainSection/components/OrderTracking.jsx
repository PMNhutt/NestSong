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
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';

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
    const [stars, setStars] = useState(0)
    const [proId, setProId] = useState('')

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
            toast.promise(
                instances.post('/feedbacks', {
                    customerID: accountID.accountId,
                    productID: proId,
                    comment: data,
                    stars: stars
                }),
                {
                    pending: '??ang feedack',
                    success: '???? g???i feedback th??nh c??ng! ????',
                    error: 'G???ith???t b???i'
                }
            )
            // console.log(
            //     {
            //         customerID: accountID.accountId,
            //         productID: proId,
            //         comment: data,
            //         stars: stars
            //     }
            // );
            // await instances.put(`/changestatusorder/${props?.orderDetail?.orderID}?reason=${data}`)
            setOpenModalFeedback(false)
            setStars(0)
            setError(false)
        } else {
            setError(true)
        }
    }

    //** handle open feed back modal **/
    const handleOpenModalFeedBack = (productID) => {
        setOpenModalFeedback(true)
        setProId(productID)
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
                        onClick={() => {
                            setOpenModalFeedback(false)
                            setStars(0)
                        }}
                        className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.5)] fixed z-[995]' />
                    <div className='fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] 
                z-[999] rounded shadow-lg bg-white px-3 py-4 w-[300px]'>
                        <p className='text-[18px] text-center font-semibold '>Nh???p ????nh gi??</p>
                        <div className='mt-4 flex justify-center'>
                            <Rating value={stars} onChange={(e, value) => setStars(value)} precision={0.5} size="large" />
                        </div>
                        <textarea
                            onBlur={(e) => setFeedBack(e.target.value)}
                            rows="4" className={`my-3 p-2.5 w-full text-gray-900 bg-white rounded border ${error ? 'border-red-500' : 'border-gray-500'}
                focus:outline-none focus:bg-white focus:border-primary  resize-none`} placeholder="Nh???p feedback t???i ????y..."></textarea>
                        <div
                            onClick={() => handleConfirmFeedBack(feedBack)}
                            className='bg-primary rounded-[5px] text-center cursor-pointer px-4 py-2 text-white font-semibold'>X??c nh???n</div>
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
                    <Tab label="Ch??? x??c nh???n" value='PENDING' icon={<AccessTimeIcon />} iconPosition="end" />
                    <Tab label="??ang giao" value='SHIPPING' icon={<LocalShippingIcon />} iconPosition="end" />
                    <Tab label="???? giao" value='SHIPPED' icon={<AssignmentTurnedInIcon />} iconPosition="end" />
                    {/* <Tab label="???? mua" icon={<TaskAltIcon />} iconPosition="end" /> */}
                    <Tab label="???? t??? ch???i" value='CANCELED' icon={<CancelIcon />} iconPosition="end" />
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
                                                            <p className='font-medium'>Danh m???c: <span className='font-normal'>{product.categoryName}</span></p>
                                                            <p className='font-medium'>S??? l?????ng: <span className='font-normal'>{product.quantityBuy}</span></p>

                                                            <div className=' gap-2 items-center'>
                                                                <p className='font-medium mt-2'>
                                                                    <span className='font-normal text-primary'>{numberWithCommas(product.salePrice)}??</span>
                                                                    <span className='font-normal line-through ml-2 text-[14px] text-gray-400'>{numberWithCommas(product.originalPrice)}??</span>
                                                                </p>
                                                                {
                                                                    item.status == 'SHIPPED' &&

                                                                    <div className='mt-3 flex gap-2'>
                                                                        <div
                                                                            onClick={() => handleOpenModalFeedBack(product.productId)}
                                                                            className='w-fit uppercase bg-primary rounded px-3 
                                                                        py-1 cursor-pointer text-center text-white text-[14px] font-medium'>G???i ????nh gi??</div>
                                                                        <Link to={'/products/detail/' + product.productName}
                                                                            onClick={() => handleOpenDetail(product.categoryId, product.productId)}
                                                                        >
                                                                            <div className='w-fit uppercase bg-green-500 rounded px-3 
                                                                        py-1 cursor-pointer text-center text-white text-[14px] font-medium'>Mua l???i</div>
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
                                                <p className='text-[18px] font-semibold'>Th??ng tin ng?????i nh???n</p>
                                                <div className='px-3'>
                                                    <p className='font-medium my-2'>H??? t??n: <span className='font-normal'>{item.customerName}</span></p>
                                                    <p className='font-medium my-2'>?????a ch??? nh???n h??ng: <span className='font-normal'>{item.address}</span></p>
                                                    <p className='font-medium my-2'>Chi nh??nh giao h??ng: <span className='font-normal'>{item.agencyName}</span></p>
                                                    <p className='font-medium my-2'>Ghi ch??: <span className='font-normal'>{item.notes}</span></p>

                                                    <p className='text-[18px] mt-6 text-primary font-medium'>T???ng ????n h??ng: <span>{numberWithCommas(item.total)} ??</span></p>
                                                </div>
                                            </>
                                            <div className='absolute top-0 right-0'>
                                                <div>
                                                    <EventNoteIcon /> {item.orderDate}
                                                </div>
                                                <p className='mt-3'>Tr???ng th??i:
                                                    {
                                                        item.status == 'PENDING' && <span className=''>Ch??? x??c nh???n</span>
                                                    }
                                                    {
                                                        item.status == 'SHIPPING' && <span className='text-green-500'>??ang giao</span>
                                                    }
                                                    {
                                                        item.status == 'SHIPPED' && <span className='text-yellow-500'>???? giao</span>
                                                    }
                                                    {
                                                        item.status == 'CANCELED' && <span className='text-red-500'>???? h???y</span>
                                                    }
                                                </p>
                                                {
                                                    item.status == 'CANCELED' &&
                                                    <p className='mt-3'>L?? do: {item?.reason}</p>
                                                }
                                            </div>
                                            {
                                                item.status == 'SHIPPING' &&
                                                <div className='absolute bottom-0 right-0 w-[150px]'>
                                                    <div
                                                        onClick={() => handleConfirm(item.orderId)}
                                                        className='bg-green-500 w-fit rounded cursor-pointer text-white font-medium px-3 py-2'>???? nh???n h??ng</div>
                                                    <p className='text-[13px] text-redError leading-4 mt-2'>X??c nh???n ???? nh???n ???????c h??ng v?? ???? thanh to??n</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        : <div className='w-full h-full flex-col gap-2 flex justify-center items-center'>
                            <div className='w-[60px] h-[60px] bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${emptyUserOrder})` }} />
                            <p className='font-medium text-[15px]'>Ch??a c?? ????n h??ng</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default OrderTracking