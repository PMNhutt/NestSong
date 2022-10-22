import { useState, useEffect } from 'react'
import styles from '../../share/style'
import { Button } from '../../share/components'
// import Logo from '../../assets/nestLogo.svg'
import { whiteLogo, nestLogo } from '../../assets'
import { getShoppingCart, setShowModalCart } from '../../redux/actionSlice/shoppingCartSlice'
import { getAccountInfo, setShowModal } from '../../redux/actionSlice/accountSlice'
import NotifyItemCart from './NotifyItemCart'
import ModalShoppingCart from './Modal/ModalShoppingCart/ModalShoppingCart'
import CornerAva from './CornerAva'

// ** Third party imports
import { NavLink, Link } from 'react-router-dom'
import { CgMenuCheese, CgClose, CgShoppingCart } from 'react-icons/cg'
import { motion, AnimatePresence } from 'framer-motion'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {
  // ** States 
  const [toggle, setToggle] = useState(false)
  const [scroll, setScroll] = useState(false)
  // const [showModalCart, setShowModalCart] = useState(false)
  const dispatch = useDispatch()
  const cartStore = useSelector((state) => state?.cart)
  const accountInfo = useSelector((state) => state?.account?.accountInfo)

  // ** Consts
  const menu = {
    visible: {
      opacity: 1, y: 0, transition: {
        ease: "easeOut",
        duration: 0.3
      }
    },
    hidden: {
      opacity: 0, y: "10vw", transition: {
        ease: "easeOut",
        duration: 0.3
      }
    }
  }
  const logo = {
    visible: {
      opacity: 1, x: 0, transition: {
        ease: "easeInOut",
        duration: 0.2
      }
    },
    hidden: {
      opacity: 0, x: "2vw", transition: {
        ease: "easeInOut",
        duration: 0.2
      }
    }
  }

  //**  Get shopping cart
  useEffect(() => {
    dispatch(getShoppingCart())
    dispatch(getAccountInfo())
    dispatch(setShowModal())
  }, [])

  // ** Scroll nav
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', null)
    }
  }, [])

  //** handle open modal cart
  const handleOpenModal = (isHover) => {
    dispatch(setShowModalCart(isHover))
  }

  return (
    <nav className={`${styles.paddingX} ${styles.boxWidth} font-maven flex items-center w-full ${scroll ? 'py-3 navbar' : 'py-6 navbar-not-scroll'}  justify-between fixed z-50 transition-all duration-200 ease-out`}>
      <Link to="/" className={`flex w-[85px] flex-col items-center ${scroll ? 'h-[50px]' : 'h-[68px]'} transition-all duration-200 ease-in-out relative`}>
        <motion.div
          initial={{}}
          animate="visible"
          className={`w-10 h-10 bg-cover cursor-pointer mb-1 ${scroll ? '' : ''} transition-all duration-200 ease-out`} style={{
            backgroundImage: `url(
                    "${scroll ? nestLogo : whiteLogo}"
                )`,
          }}>
        </motion.div>
        <AnimatePresence>
          {!scroll && (
            <motion.span
              variants={logo}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={` ${scroll ? 'text-black' : 'text-white'} text-[20px] tracking-[5px] uppercase select-none absolute z-10 top-10`}>Nesty</motion.span>
          )}
        </AnimatePresence>
      </Link>

      <ul className="list-none sm:flex hidden justify-center items-center flex-1 gap-10">
        <li className={`font-maven cursor-pointer ${scroll ? 'text-black' : 'text-white'} text-[18px]`}>
          <NavLink className={(navData) => navData.isActive ? `${scroll ? 'text-primary' : 'text-white'} font-bold drop-shadow-lg shadow-white` : "drop-shadow-lg shadow-black"} to='/'>Trang chủ</NavLink>
        </li>
        <li className={`font-maven cursor-pointer ${scroll ? 'text-black' : 'text-white'} text-[18px]`}>
          <NavLink className={(navData) => navData.isActive ? `${scroll ? 'text-primary' : 'text-white'} font-bold drop-shadow-lg shadow-white` : "drop-shadow-lg shadow-black"} to='/products'>Sản phẩm</NavLink>
        </li>
        <li className={`font-maven cursor-pointer ${scroll ? 'text-black' : 'text-white'} text-[18px]`}>
          <NavLink className={(navData) => navData.isActive ? `${scroll ? 'text-primary' : 'text-white'} font-bold drop-shadow-lg shadow-white` : "drop-shadow-lg shadow-black"} to='/about'>Giới thiệu</NavLink>
        </li>
      </ul>

      <div className="sm:hidden flex justify-center items-center">
        <div
          onClick={() => setToggle(prev => !prev)}
          className="w-[28px] h-[28px] cursor-pointer ">
          {toggle ? <CgClose className="w-full h-full text-red-500" /> : <CgMenuCheese className={`w-full h-full ${scroll ? 'text-black' : 'text-white'}`} />}
        </div>
        <AnimatePresence>
          {toggle && (
            <motion.div
              variants={menu}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`flex p-6 bg-white shadow-lg absolute top-20 mx-4 my-2
        min-w-[140px] rounded-xl sidebar`}>
              <ul className="list-none flex flex-col justify-center items-center flex-1">
                <li className="font-maven cursor-pointer text-black text-[18px] py-2 px-4 rounded-md hover:bg-blue-300">
                  <NavLink className={(navData) => navData.isActive ? "font-bold text-primary" : ""} to='/'>Trang chủ</NavLink>
                </li>
                <li className="font-maven cursor-pointer text-black text-[18px] py-2 px-4 rounded-md hover:bg-blue-300">
                  <NavLink className={(navData) => navData.isActive ? "font-bold text-primary" : ""} to='/products'>Sản phẩm</NavLink>
                </li>
                <li className="font-maven cursor-pointer text-black text-[18px] py-2 px-4 rounded-md hover:bg-blue-300">
                  <NavLink className={(navData) => navData.isActive ? "font-bold text-primary" : ""} to='/about'>Giới thiệu</NavLink>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div className='flex items-center'>
        <div className={`text-[30px] mr-8 relative ${scroll ? 'text-black' : 'text-white'}`}>
          <Link to='/cart' onClick={() => dispatch(setShowModalCart(false))}>
            <div className='cursor-pointer py-5'
              onMouseEnter={() => handleOpenModal(true)}
              onMouseLeave={() => handleOpenModal(false)}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: '30px' }} />
              <NotifyItemCart shoppingCart={cartStore?.shoppingCart} />
            </div>
          </Link>
          {(cartStore?.shoppingCart?.length > 0) &&
            <div
              onMouseEnter={() => handleOpenModal(true)}
              onMouseLeave={() => handleOpenModal(false)}
            >
              <AnimatePresence>
                {cartStore.showModal &&
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
                    <ModalShoppingCart shoppingCart={cartStore?.shoppingCart} />
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          }
        </div>

        {
          accountInfo ? (
            Object.keys(accountInfo)?.length === 0
              && accountInfo?.constructor === Object
              ?
              <Link to='/sign-in'>
                <Button styles="bg-primary rounded-[5px]">
                  Đăng nhập
                </Button>
              </Link>
              :
              <CornerAva />
          ) : <Link to='/sign-in'>
            <Button styles="bg-primary rounded-[5px]">
              Đăng nhập
            </Button>
          </Link>
        }
      </div>

    </nav>
  )
}

export default Navigation