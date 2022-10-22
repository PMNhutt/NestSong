import { useState, useEffect } from 'react'
import DataTable from './components/DataTable'
import instances from '../../../../utils/plugin/axios'
import { useSelector } from 'react-redux'

const StaffOrder = () => {

    // ** Const */
    const [ordersNumber, setOrdersNumber] = useState(0)
    const [agencyName, setAgencyName] = useState('TP HCM')
    const [orderList, setOrderList] = useState([])
    const staffInfo = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get('/staff/orders', {
                params: {
                    agencyId: staffInfo.agencyId,
                }
            })
            setOrdersNumber(res?.data?.total)
            if (res?.data?.status === 402) {
                setOrderList([])
            } else {
                setOrderList(res?.data?.result)
            }
        }
        
        fetch()
    }, [])

    return (
        <div>
            <p className='text-[18px]'>Chi nhánh: <span className='font-medium text-primary'>{staffInfo?.address}</span></p>
            <p className='text-[18px] mt-3'>Đơn hàng chờ xử lý: <span className='font-medium text-primary'>{ordersNumber}</span></p>

            <div className='mt-6'>
                <DataTable orderList={orderList} />
            </div>
        </div>
    )
}

export default StaffOrder