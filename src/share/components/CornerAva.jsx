import { useState, useEffect, useRef } from 'react'
import instances from '../../utils/plugin/axios';
import { setAccountInfo, setShowModal } from '../../redux/actionSlice/accountSlice'

// ** image
import { defaultAva } from '../../assets/images'

// ** third party libraries
import { motion, AnimatePresence } from 'framer-motion'
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler';

const CornerAva = (props) => {

    // ** Const
    const [openModal, setopenModal] = useState(false)
    const dispatch = useDispatch()
    const showModal = useSelector((state) => state.account.showModal)
    const navigate = useNavigate();

    //** handle logout */
    const handleLogout = async () => {
        const res = await instances.post('/logout')
        navigate('/')
        dispatch(setAccountInfo({}))
    }

    return (
        <div className='relative font-maven'
            onClick={() => dispatch(setShowModal(true))}
        >
            <div className='w-[35px] h-[35px] bg-cover bg-center rounded-full cursor-pointer' style={{ backgroundImage: `url(${defaultAva})` }} />
            <AnimatePresence>
                {showModal &&
                    <OutsideClickHandler onOutsideClick={() => dispatch(setShowModal(false))}>
                        <motion.div
                            transition={{ duration: 0.3, type: "tween" }}
                            initial={{
                                opacity: 0, y: '-5vh'
                            }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                                opacity: 0, y: '-5vh'
                            }}
                        >
                            <div className='absolute z-40 bg-white rounded-[5px]
        overflow-hidden top-[20px] border shadow-md text-black w-max right-[10%] '
                            >
                                <Link to='/profile'>
                                    <div className='flex cursor-pointer gap-2 items-center hover:bg-blue-100 p-2'>
                                        <AccountCircleIcon sx={{ fontSize: '16px' }} />
                                        <p>Thông tin cá nhân</p>
                                    </div>
                                </Link>
                                <div className='flex cursor-pointer gap-2 items-center hover:bg-blue-100 p-2'>
                                    <AssignmentIcon sx={{ fontSize: '16px' }} />
                                    <p>Kiểm tra đơn hàng</p>
                                </div>
                                <div className='flex cursor-pointer gap-2 items-center hover:bg-blue-100 p-2'
                                    onClick={() => handleLogout()}
                                >
                                    <LogoutIcon sx={{ fontSize: '18px' }} />
                                    <p>Đăng xuất</p>
                                </div>
                            </div>

                        </motion.div>
                    </OutsideClickHandler>
                }
            </AnimatePresence>

        </div >
    )
}

export default CornerAva