import { useState, useEffect } from 'react'
import instances from '../../../../../utils/plugin/axios';

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

const OrderTracking = () => {

    //** State */
    const [value, setValue] = useState(0)
    const [orderList, setOrderList] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='font-maven'>
            <div className='rounded border shadow-lg'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                // centered
                >
                    <Tab label="Chờ xác nhận" icon={<AccessTimeIcon />} iconPosition="end" />
                    <Tab label="Đang giao" icon={<LocalShippingIcon />} iconPosition="end" />
                    <Tab label="Đã giao" icon={<AssignmentTurnedInIcon />} iconPosition="end" />
                    <Tab label="Đã mua" icon={<TaskAltIcon />} iconPosition="end" />
                    <Tab label="Đã từ chối" icon={<CancelIcon />} iconPosition="end" />
                </Tabs>
            </div>

            <div className='rounded border shadow-md h-[60vh] mt-5'>
                {
                    orderList?.length > 0 ?
                    <></>
                    : <div className='w-full h-full flex-col gap-2 flex justify-center items-center'>
                        <div className='w-[60px] h-[60px] bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url(${emptyUserOrder})`}}/>
                        <p className='font-medium text-[15px]'>Chưa có đơn hàng</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default OrderTracking