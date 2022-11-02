import { useEffect, useState } from 'react'
import DeliveryAddress from './components/DeliveryAddress/DeliveryAddress'
import ContinueSection from './components/ContinueSection/ContinueSection'
import OrderItem from './components/ContinueSection/OrderItem'
import PaymentMethod from './components/DeliveryAddress/PaymentMethod'
import instances from '../../utils/plugin/axios'
import LoadingSmall from '../../share/components/LoadingSmall/LoadingSmall'
import { deleteProductDetail } from '../../redux/actionSlice/productSlice'

//** images
import { footer } from '../../assets/images'

//** Third party components*/
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const Order = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title])

    //** Const */
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accountInfo = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
    const accessToken = localStorage.getItem('accessToken')
    let decoded_jwt = {}
    if (accessToken) {
        decoded_jwt = jwt_decode(accessToken)
    }
    const [accountDetail, setAccountDetail] = useState()

    const [provinces, setProvinces] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const shoppingCart = useSelector((state) => state.cart?.shoppingCart)
    // const accountInfo = useSelector((state) => state.account?.accountInfo)
    const userName = `${accountInfo?.firstName} ${accountInfo?.lastName}`
    const email = `${accountInfo?.email}`
    const [userPhone, setUserPhone] = useState('')
    const [userAddress, setUserAddress] = useState('')

    const [deliveryInfo, setDeliveryInfo] = useState({
        name: {
            value: userName,
            error: false,
        },
        phone: {
            value: userPhone,
            error: false,
        },
        email: email,
        address: {
            value: userAddress,
            error: false,
        },
        note: '',
        provinces: {
            value: '',
            error: false,
        },
        compareStock: ''
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

    //** get detail account info  */
    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get('/accounts/id', {
                params: {
                    id: accountInfo?.accountId
                }
            })
            setAccountDetail(res?.data?.result)
            setUserPhone(res?.data?.result.phoneNumber)
            setUserAddress(res?.data?.result.address)
            handleInputPhone(res?.data?.result.phoneNumber)
            handleInputAddress(res?.data?.result.address)
        }

        fetch()
    }, [])

    //** get delivery information */
    const handleInputName = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            name: {
                value: value ? value : userName,
                error: value ? false : true
            }
        }))
    }
    const handleInputPhone = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            phone: {
                value: value ? value : userPhone,
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
                value: value ? value : userAddress,
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
    const handleCompareStock = (value) => {
        setDeliveryInfo(currVal => ({
            ...currVal,
            compareStock: value
        }))
    }


    if (accessToken) {
        if (Object.keys(decoded_jwt).length === 0
            && decoded_jwt.constructor === Object) {
            return <Navigate replace to="/" />
        } else {
            if (decoded_jwt.Role === 'User') {
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
                                    handleCompareStock={handleCompareStock}
                                    deliveryInfo={deliveryInfo}
                                    userInfo={accountInfo}
                                    userPhone={userPhone}
                                    userAddress={userAddress}
                                    accountDetail={accountDetail}
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
            } else {
                return <Navigate replace to="/management" />
            }
        }
    } else {
        return <Navigate replace to="/" />
    }

}

export default Order