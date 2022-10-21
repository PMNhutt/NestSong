import { useState, useEffect } from 'react'
import DataTable from './components/DataTable'

const StaffOrder = () => {

    // ** Const */
    const [ordersNumber, setOrdersNumber] = useState(0)
    const [agencyName, setAgencyName] = useState('TP HCM')
    const [orderList, setOrderList] = useState([])

    return (
        <div>
            <p className='text-[18px]'>Chi nhánh: <span className='font-medium text-primary'>{agencyName}</span></p>
            <p className='text-[18px] mt-3'>Đơn hàng chờ xử lý: <span className='font-medium text-primary'>{ordersNumber}</span></p>

            <div className='mt-6'>
                <DataTable orderList={orderList}/>
            </div>
        </div>
    )
}

export default StaffOrder