import { useState, useEffect } from 'react'
import DataTable from './components/DataTable'
import ViewDetailOrder from './components/ViewDetailOrder'

import instances from '../../../../utils/plugin/axios'
import { useSelector } from 'react-redux'

const StaffOrder = () => {

    // ** Const */
    const [isShowModal, setIsShowModal] = useState(false)
    const [orderDetail, setOrderDetail] = useState()
    const [ordersNumber, setOrdersNumber] = useState(0)
    const [statusChange, setStatusChange] = useState(false)
    const [orderList, setOrderList] = useState([])
    const staffInfo = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get('/staff/orders', {
                params: {
                    agencyId: staffInfo.agencyId,
                }
            })
            setOrdersNumber(res?.data?.total_results || 0)
            if (res?.data?.status === 402) {
                setOrderList([])
            } else {
                setOrderList(res?.data?.result)
            }
        }

        fetch()
    }, [statusChange])

    //** handle open order detail */
    const handleOpenOrderDetail = async (orderId) => {
        const res = await instances.get(`/staff/orderdetails/${orderId}`)
        setIsShowModal(true)
        setOrderDetail(res?.data?.results)
        // console.log(res?.data?.results);
    }

    return (
        <div>
            {
                isShowModal &&
                <ViewDetailOrder
                    isShowModal={isShowModal}
                    setIsShowModal={setIsShowModal}
                    orderDetail={orderDetail}
                    setStatusChange={setStatusChange}
                />
            }
            <p className='text-[18px]'>Chi nhánh: <span className='font-medium text-primary'>{staffInfo?.address}</span></p>
            <p className='text-[18px] mt-3'>Đơn hàng chờ xử lý: <span className='font-medium text-primary'>{ordersNumber}</span></p>

            <div className='mt-6'>
                <DataTable
                    handleOpenOrderDetail={handleOpenOrderDetail}
                    isShowModal={isShowModal}
                    setIsShowModal={setIsShowModal}
                    orderList={orderList}
                />
            </div>
        </div>
    )
}

export default StaffOrder