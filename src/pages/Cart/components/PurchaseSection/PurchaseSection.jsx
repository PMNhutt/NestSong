import { useRef, useEffect, useState } from 'react'
import numberWithCommas from '../../../../utils/numberWithComma'
import ModalRequireLogin from '../../../../share/components/Modal/ModalRequireLogin/ModalRequireLogin'

//** Third party components*/
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const PurchaseSection = () => {
    //** Const */
    const cartList = useSelector((state) => state.cart.shoppingCart)
    const navigation = useNavigate()
    const [openModal, setOpenModal] = useState(false)

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

    //** disable Link */
    const DelayedLink = ({ delay, replace, state, to, ...props }) => {
        const navigate = useNavigate();
        const timerRef = useRef();
        const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
        const accessToken = localStorage.getItem('accessToken')
        let decoded_jwt = {}
        if (accessToken) {
            decoded_jwt = jwt_decode(accessToken)
        }
        useEffect(() => () => clearTimeout(timerRef.current), []);

        const clickHandler = async (e) => {
            e.preventDefault();
            // await handleBuyNow()
            if (cartList?.length > 0) {
                if (accessToken) {
                    if (decoded_jwt.Role === 'User') {
                        timerRef.current = setTimeout(navigate, delay, to, { replace, state });
                    } else {
                        // navigation('/sign-in')
                        setOpenModal(true)
                    }
                } else {
                    setOpenModal(true)
                }
            }
        };

        return <Link to={to} {...props} onClick={clickHandler} />;
    };

    return (
        <>
            {
                openModal &&
                <ModalRequireLogin
                    setOpenModal={setOpenModal}
                />
            }
            <div className='sticky top-[100px] mb-10'>
                <div className='text-black border rounded-[5px] shadow-md  px-6 py-2 h-fit'>
                    <div className='pb-2 mb-5 border-b flex items-center justify-between'>
                        <p className='font-semibold'>Đơn hàng</p>
                        <p className=''>{totalItem?.totalItem} sản phẩm</p>
                    </div>
                    <div className='flex justify-between mb-4'>
                        <p className='text-primary font-medium text-[18px]'>Tổng tiền</p>
                        <p className='text-[18px] text-primary font-medium'>{numberWithCommas(totalItem?.totalPrice)} đ</p>
                    </div>
                </div>
                <DelayedLink delay={0} to='/order'>
                    <div className={`uppercase select-none text-white font-semibold mt-5 w-full text-center py-2 rounded-[5px]
            ${cartList?.length > 0 ? 'cursor-pointer bg-primary' : 'cursor-not-allowed bg-blue-200'}`}>Đặt hàng ngay</div>
                </DelayedLink>

            </div>
        </>
    )
}

export default PurchaseSection