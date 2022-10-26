import { useState, useEffect, useRef } from 'react'
import completeOrder from '../../../lottie/completeOrder.json'

//** Third party components*/
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'

const ModalCompleteOder = (props) => {
    //**Const */
    const [isShowModal, setIsShowModal] = useState(true)

    // useEffect(() => {
    //     if (isShowModal) {
    //         document.body.style.overflow = 'hidden'
    //     } else {
    //         document.body.style.overflow = 'unset'
    //     }
    // }, [isShowModal])

    const DelayedLink = ({ delay, replace, state, to, ...props }) => {
        const navigate = useNavigate();
        const timerRef = useRef();
        useEffect(() => () => clearTimeout(timerRef.current), []);

        const clickHandler = async (e) => {
            e.preventDefault();
            await setIsShowModal(false)
            timerRef.current = setTimeout(navigate, delay, to, { replace, state });
        };

        return <Link to={to} {...props} onClick={clickHandler} />;
    };

    return (
        <>
            <div className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[9999]'>
            </div>
            <div className='sm:w-max w-full bg-white fixed z-[99999] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>
                <div className='font-maven text-center p-5'>
                    <Lottie
                        animationData={completeOrder}
                        loop={true}
                        controls={false}
                        className="h-[30vh]"
                    />
                    <p className='text-black text-[18px] font-medium'>Đơn hàng đã được tiếp nhận!</p>
                    <div className='flex gap-3 mt-8'>
                        <DelayedLink delay={0} to='/profile'>
                            <div className='bg-primary py-2 px-4 rounded-[5px] cursor-pointer'>
                                <p className='font-medium'>Theo dõi đơn hàng</p>
                            </div>
                        </DelayedLink>
                        <DelayedLink delay={0} to='/products'>
                            <div className='bg-primary py-2 px-4 rounded-[5px] cursor-pointer'>
                                <p className='font-medium'>Tiếp tục mua sắm</p>
                            </div>
                        </DelayedLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCompleteOder