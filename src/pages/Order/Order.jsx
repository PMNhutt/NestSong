import { useEffect, useState } from 'react'
import DeliveryAddress from './components/DeliveryAddress/DeliveryAddress'
import ContinueSection from './components/ContinueSection/ContinueSection'
import OrderItem from './components/ContinueSection/OrderItem'
import PaymentMethod from './components/DeliveryAddress/PaymentMethod'
import instances from '../../utils/plugin/axios'

//** images
import { footer } from '../../assets/images'

//** Third party components*/
import { useDispatch, useSelector } from 'react-redux'

const Order = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title])

    //** Const */
    const dispatch = useDispatch()
    const [provinces, setProvinces] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const shoppingCart = useSelector((state) => state.cart?.shoppingCart)
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
            value: '',
            error: false,
        },
        // district: '',
        // ward: '',
    })

    //** get agencies */
    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get('/agencies')
            // console.log(res?.data?.result)
            setProvinces(res?.data?.result)
        }

        fetch()
    }, [])

    //** get delivery information */
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
    const handleSelectProvinces = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            provinces: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleSelectDistrict = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            district: value
        }))
    }
    const handleSelectWard = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            ward: value
        }))
    }


    return (
        <div className='font-maven'>
            <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
            <div className='sm:px-16 px-6 mt-10 mb-20 flex gap-7 sm:flex-row flex-col'>
                <div className='md:w-[70%] w-full'>
                    <DeliveryAddress
                        provinces={provinces}
                        district={district}
                        ward={ward}
                        setProvinces={setProvinces}
                        setDistrict={setDistrict}
                        setWard={setWard}
                        handleInputName={handleInputName}
                        handleInputPhone={handleInputPhone}
                        handleInputEmail={handleInputEmail}
                        handleInputAddress={handleInputAddress}
                        handleInputNote={handleInputNote}
                        handleSelectProvinces={handleSelectProvinces}
                        handleSelectDistrict={handleSelectDistrict}
                        handleSelectWard={handleSelectWard}
                        deliveryInfo={deliveryInfo}
                    />
                    <PaymentMethod />
                </div>
                <div className='md:w-[30%] w-full'>
                    <OrderItem />
                    <ContinueSection
                        deliveryInfo={deliveryInfo}
                        setDeliveryInfo={setDeliveryInfo}
                    />
                </div>
            </div>
        </div>
    )
}

export default Order