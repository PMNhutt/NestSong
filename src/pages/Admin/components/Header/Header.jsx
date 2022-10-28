import { useState, useEffect } from 'react'
import { defaultAva } from '../../../../assets/images'
import { setAccountInfo } from '../../../../redux/actionSlice/accountSlice'

//** third party libraries*/
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { motion, AnimatePresence } from 'framer-motion'
import OutsideClickHandler from 'react-outside-click-handler';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const Header = (props) => {

    //** Const */
    const [openModal, setopenModal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    //** handle logout */
    const handleLogout = async () => {
        // const res = await instances.post('/logout')
        navigate('/')
        localStorage.removeItem('accessToken')
        dispatch(setAccountInfo({}))
    }

    return (
        <div className='w-full'>
            <div className='fixed top-0 right-0 z-[44] w-full pr-20 pl-[20rem]'>
                <div className='py-5  flex justify-end backdrop-blur-[6px]'>
                    <div
                        onClick={() => setopenModal(true)}
                        className='relative cursor-pointer flex items-center gap-2 hover:bg-gray-200 border border-gray-300 rounded-[50px] py-1 pr-1 pl-2'>
                        <p className='text-[15px] '>Xin chào <span className='font-medium'>{props?.info.lastName}</span></p>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="User" src={defaultAva} sx={{ width: 30, height: 30 }} />
                        </StyledBadge>
                    </div>
                    <AnimatePresence>
                        {openModal &&
                            <OutsideClickHandler onOutsideClick={() => setopenModal(false)}>
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
                                    <div className='absolute z-40 bg-white rounded-[5px] overflow-hidden top-[45px] border shadow-md text-black w-max right-[10%] '
                                    >
                                        <p className='text-[14px] pl-2 pt-2 text-gray-400'>@{props?.role}</p>
                                        {/* <div className='flex cursor-pointer gap-2 items-center hover:bg-blue-100 p-2'>
                                            <AccountCircleIcon sx={{ fontSize: '16px' }} />
                                            <p>Thông tin cá nhân</p>
                                        </div> */}
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
                </div>
            </div>
        </div>
    )
}

export default Header