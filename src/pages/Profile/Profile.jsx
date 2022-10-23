import { useEffect, useState } from 'react'
import { setShowModal } from '../../redux/actionSlice/accountSlice'
import instances from '../../utils/plugin/axios'
import AvaSection from './components/AvaSection/AvaSection'
import MainSection from './components/MainSection/MainSection'
import MenuSection from './components/MenuSection/MenuSection'

//** Third party libraries */
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

// ** images */
import { footer } from '../../assets/images'

const Profile = () => {

  //** States */
  const dispatch = useDispatch()
  const [imageTest, setImageTest] = useState()
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

  useEffect(() => {
    //Close ava modal
    dispatch(setShowModal(false))
  }, [])

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await instances.get('/admin/products')
  //     let product = res?.data?.result?.find(instance => instance.productId === 'fab99040-52fc-419d-b14e-8f6dd12da4bc')
  //     setImageTest(product.image)
  //   }

  //   fetch()
  // }, [])
  if (loggedInUser) {
    if (Object.keys(loggedInUser).length === 0
      && loggedInUser.constructor === Object) {
      return <Navigate replace to="/" />
    } else {
      if (loggedInUser.authorizeRole === 'User') {
        return (
          <div className='text-black'>
            <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
            <div className='sm:px-16 px-6 mt-10 mb-20'>
              <div className='flex gap-5'>
                <div className='w-[20%] rounded border shadow-md p-4'>
                  <AvaSection info={loggedInUser}/>
                  <MenuSection />
                </div>
                <div className='w-[80%] rounded border shadow-md p-4'>
                  <MainSection />
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return <Navigate replace to="/" />
      }
    }
  } else {
    return <Navigate replace to="/" />
  }

}

export default Profile