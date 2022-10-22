import { useState, useEffect } from 'react'
import CustomerInfo from './components/CustomerInfo/CustomerInfo'
import CartList from './components/CartList/CartList'
import CompleteCreate from './components/CompleCreateOrder/CompleteCreate'
import DataTable from './components/DataTable/DataTable'
import useDebounce from '../../../../share/hooks/useDebounce'
import instances from '../../../../utils/plugin/axios'

//** icon */
import { icPin } from '../../../../assets/images'

// ** Third party components*/
import { MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux'
import { Input } from '@mui/material'

const StaffCreateOrder = () => {
    const [searchVal, setSearchVal] = useState('')
    const debounced = useDebounce(searchVal, 600)
    const [dashboardProList, setDashboardProList] = useState([])
    const staffInfo = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

    const [cartList, setCartList] = useState([])
    const [agency, setAgency] = useState('TP HCM')
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: {
            value: '',
            error: false,
        },
        phone: {
            value: '',
            error: false,
        },
        email: '',
        address: {
            value: '',
            error: false,
        },
        note: '',
        provinces: {
            value: staffInfo?.agencyId,
            error: false,
        },
        // district: '',
        // ward: '',
    })

    // ** call search api
    useEffect(() => {
        if (debounced !== '') {
            if (!debounced.trim()) {
                return;
            }

            const fetch = async () => {
                const res = await instances.get('/products/search', {
                    params: {
                        name: debounced,
                        size: 100000,
                        page: 1,
                    }
                })
                setDashboardProList(res?.data?.result)
            }
            fetch()
        } else {
            const fetch = async () => {
                const res = await instances.get('/products', {
                    params: {
                        size: 100000,
                        page: 1,
                    }
                })
                setDashboardProList(res?.data?.result)
            }
            fetch()
        }


    }, [debounced])

    const handleInputName = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            name: {
                value: value,
                error: value ? false : true
            }
        }))
    }

    const handleInputPhone = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            phone: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputEmail = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            email: value
        }))
    }
    const handleInputAddress = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            address: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputNote = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            note: value
        }))
    }

    return (
        <div>
            <div className='mb-10'>
                <p className='text-[20px] font-semibold mb-6'>Chọn sản phẩm</p>
                <div className='mb-4'>
                    <Input placeholder='Tìm kiếm ở đây...' onChange={(e) => setSearchVal(e.target.value)} />
                </div>
                <DataTable
                    setCartList={setCartList}
                    dashboardProList={dashboardProList} />
            </div>

            <div className='flex gap-5 sm:flex-row flex-col pb-8'>
                <div className='w-[70%]'>
                    <p className='text-[20px] font-semibold'>Thông tin khách hàng</p>
                    <div className='mt-6'>
                        <CustomerInfo
                            handleInputName={handleInputName}
                            handleInputPhone={handleInputPhone}
                            handleInputEmail={handleInputEmail}
                            handleInputAddress={handleInputAddress}
                            handleInputNote={handleInputNote}
                            deliveryInfo={deliveryInfo}
                            agency={staffInfo?.address}
                        />
                    </div>
                </div>
                <div className='w-[30%]'>
                    <p className='text-[20px] font-semibold'>Thông tin đơn hàng</p>
                    <div className='mt-6'>
                        <CartList
                            cartList={cartList}
                        />
                        <CompleteCreate
                            deliveryInfo={deliveryInfo}
                            setDeliveryInfo={setDeliveryInfo}
                            cartList={cartList}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StaffCreateOrder