import { useRef, useState } from 'react'
import numberWithCommas from '../../../../../../utils/numberWithComma'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { removeCart } from '../../../../../../redux/actionSlice/managementSlice'
import { useSelector, useDispatch } from 'react-redux'
import ModalStaffOrder from '../../../../../../share/components/Modal/ModalStaffOrder/ModalStaffOrder'
import instances from '../../../../../../utils/plugin/axios';

const CompleteCreate = (props) => {
    //** Const */
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()
    const cartList = useSelector((state) => state.management.cartList)
    const notifyWarn = () => toast.warn("Vui lòng điền đầy đủ thông tin cần thiết !", {
        pauseOnHover: false,
    });

    //** handle total item */
    const totalItemInCart = () => {
        let total = 0;
        let totalPrice = 0
        let totalItem = 0
        if (cartList?.length > 0) {
            totalItem = cartList?.length
            cartList.forEach(item => {
                total += item.amount
                totalPrice += (item.amount * item.price)
            })
        }
        return { total, totalPrice, totalItem }
    }
    const totalItem = totalItemInCart()

    //** handle click complete button */
    const handleCompletePurchase = async () => {
        if (cartList?.length > 0) {
            if ((props?.deliveryInfo?.provinces?.value !== "")
                && (props?.deliveryInfo?.address?.value !== "")) {
                // setOpenModal(true)
                dispatch(removeCart())
                // dispatch(getShoppingCart())
                const res = await instances.post('/orders/createorder/offline', {
                    user: {
                        // customerId: accountInfo?.accountId,
                        address: props?.deliveryInfo?.address?.value,
                        agencyID: props?.deliveryInfo?.provinces?.value,
                        notes: props?.deliveryInfo?.note
                    },
                    cart: cartList?.map((item) => (
                        {
                            productId: item.id,
                            quantityBuy: item.amount,
                            productName: item.name,
                            salePrice: item.price
                        }
                    ))
                })
                if (res?.status === 200) {
                    setOpenModal(true)
                } else {
                    console.log('CREATE ORDER FAILED');
                }
            } else {
                notifyWarn()
                if (props?.deliveryInfo?.address?.value == "") {
                    props?.setDeliveryInfo(currVal => ({
                        ...currVal,
                        address: {
                            value: '',
                            error: true
                        }
                    }))
                }
            }
        }
    }

    return (
        <>
            {
                openModal &&
                <ModalStaffOrder
                    setOpenModal={setOpenModal}
                />
            }
            <div className='mt-3'>
                <div className='text-black border rounded-[5px] shadow-md  px-6 py-2 h-fit bg-white'>
                    <div className='flex justify-between mb-2'>
                        <p className='font-medium text-gray-600 text-[16px]'>Tổng giá trị sản phẩm</p>
                        <p className='text-[16px] text-gray-600 font-medium'>{numberWithCommas(totalItem?.totalPrice)} đ</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-medium text-[18px]'>Tổng thanh toán</p>
                        <p className='text-[18px] font-medium'>{numberWithCommas(totalItem?.totalPrice)} đ</p>
                    </div>
                </div>
                <div onClick={() => handleCompletePurchase()} className={`uppercase select-none text-white font-semibold mt-5 w-full text-center py-2 rounded-[5px]
            ${cartList?.length > 0 ? 'cursor-pointer bg-primary' : 'cursor-not-allowed bg-blue-200'}`}>tạo đơn đặt hàng</div>
            </div>
        </>
    )
}

export default CompleteCreate