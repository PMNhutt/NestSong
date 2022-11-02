import { useRef, useState } from 'react'
import ModalCompleteOder from '../../../../share/components/Modal/ModalCompleteOrder/ModalCompleteOder'
import ModalError from '../../../../share/components/Modal/ModalError/ModalError'
import { removeCart, getShoppingCart } from '../../../../redux/actionSlice/shoppingCartSlice'
import instances from '../../../../utils/plugin/axios'

//**Third party components*/
import { useSelector, useDispatch } from 'react-redux'
import numberWithCommas from '../../../../utils/numberWithComma'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const ContinueSection = (props) => {

    //** Const */
    const dispatch = useDispatch()
    const shoppingCart = useSelector((state) => state.cart?.shoppingCart)
    const accountInfo = useSelector((state) => state.account?.accountInfo)
    const notifyWarn = () => toast.warn("Vui lòng điền đầy đủ thông tin cần thiết !", {
        pauseOnHover: false,
    });
    const notifyStockNotEnough = () => toast.warn("Vui lòng chọn chi nhánh khác !", {
        pauseOnHover: false,
    });
    const [openModal, setOpenModal] = useState(false)
    const [openErrorModal, setOpenErrorModal] = useState(false)

    //** handle total item */
    const totalItemInCart = () => {
        let total = 0;
        let totalPrice = 0
        let totalItem = 0
        if (shoppingCart?.length > 0) {
            totalItem = shoppingCart?.length
            shoppingCart.forEach(item => {
                total += item.amount
                totalPrice += (item.amount * item.price)
            })
        }
        return { total, totalPrice, totalItem }
    }
    const totalItem = totalItemInCart()

    //** handle complePurchase */
    function hasNull(target) {
        for (var member in target) {
            if (member?.name?.value === '') {
                return true;
            }
        }
        return false;
    }
    const handleCompletePurchase = async () => {
        if (shoppingCart?.length > 0) {
            // console.log(props?.deliveryInfo?.phone?.value)
            if ((props?.deliveryInfo?.name?.value !== "")
                && (props?.deliveryInfo?.phone?.value !== '')
                && (props?.deliveryInfo?.provinces?.value !== "")
                && (props?.deliveryInfo?.address?.value !== "")) {

                if (props?.deliveryInfo?.compareStock !== "") {
                    let compareResArr = props?.deliveryInfo?.compareStock
                    if (compareResArr.some(item => item.compare === true)) {
                        notifyStockNotEnough()
                    } else {
                        toast.promise(
                            instances.post('/orders/createorder/online', {
                                user: {
                                    customerID: accountInfo?.accountId,
                                    address: props?.deliveryInfo?.address?.value,
                                    agencyID: props?.deliveryInfo?.provinces?.value,
                                    notes: props?.deliveryInfo?.note
                                },
                                cart: shoppingCart?.map((item) => (
                                    {
                                        productId: item.id,
                                        quantityBuy: item.amount,
                                        productName: item.name,
                                        salePrice: item.price
                                    }
                                ))
                            }).then(() => {
                                setOpenModal(true)
                                dispatch(removeCart())
                                dispatch(getShoppingCart())

                                let localList = JSON.parse(localStorage.getItem('LIST_AGENCIES'))
                                if (localList) {
                                    localStorage.removeItem('LIST_AGENCIES')
                                }
                            }),
                            {
                                pending: 'Đang tạo đơn hàng',
                                success: 'Đơn hàng đã được tiếp nhận! 👌',
                                error: 'Đơn hàng chưa được tiếp nhận'
                            }
                        )
                    }
                }
            } else {
                notifyWarn()
                if (props?.deliveryInfo?.name?.value == "") {
                    props?.setDeliveryInfo(currVal => ({
                        ...currVal,
                        name: {
                            value: '',
                            error: true
                        }
                    }))
                }
                if (props?.deliveryInfo?.phone?.value == null) {
                    props?.setDeliveryInfo(currVal => ({
                        ...currVal,
                        phone: {
                            value: '',
                            error: true
                        }
                    }))
                }
                if (props?.deliveryInfo?.provinces?.value == "") {
                    props?.setDeliveryInfo(currVal => ({
                        ...currVal,
                        provinces: {
                            value: '',
                            error: true
                        }
                    }))
                }
                if (props?.deliveryInfo?.address?.value == null) {
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

    //** disable Link */
    const DelayedLink = ({ delay, replace, state, to, ...props }) => {
        const navigate = useNavigate();
        const timerRef = useRef();
        useEffect(() => () => clearTimeout(timerRef.current), []);

        const clickHandler = async (e) => {
            e.preventDefault();
            // await handleBuyNow()
            if (shoppingCart?.length > 0) {
                timerRef.current = setTimeout(navigate, delay, to, { replace, state });
            }
        };

        return <Link to={to} {...props} onClick={clickHandler} />;
    };

    return (
        <>
            {openModal &&
                <ModalCompleteOder />
            }
            {
                openErrorModal &&
                <ModalError
                    title='Tạo đơn hàng thất bại!'
                    setOpenErrorModal={setOpenErrorModal}
                />
            }
            <div className='text-black border rounded-[5px] shadow-md  px-6 py-2 h-fit'>
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
            ${shoppingCart?.length > 0 ? 'cursor-pointer bg-primary' : 'cursor-not-allowed bg-blue-200'}`}>hoàn tất đặt hàng</div>
        </>
    )
}

export default ContinueSection