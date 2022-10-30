import { useEffect, useState } from 'react'
import { setShowModal } from '../../redux/actionSlice/accountSlice'
import { deleteProductDetail } from '../../redux/actionSlice/productSlice'
import instances from '../../utils/plugin/axios'
import AvaSection from './components/AvaSection/AvaSection'
import MainSection from './components/MainSection/MainSection'
import MenuSection from './components/MenuSection/MenuSection'

//** Third party libraries */
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

// ** images */
import { footer } from '../../assets/images'

const Profile = ({ title }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  //** States */
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState()
  const [activeMenu, setActiveMenu] = useState(1)
  const [updateStatus, setUpdateStatus] = useState(false)
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
  const accessToken = localStorage.getItem('accessToken')
  let decoded_jwt = {}
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken)
  }

  useEffect(() => {
    //Close ava modal
    dispatch(setShowModal(false))
  }, [])


  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0
      && decoded_jwt.constructor === Object) {
      return <Navigate replace to="/" />
    } else {
      if (decoded_jwt.Role === 'User') {
        useEffect(() => {
          const fetch = async () => {
            const res = await instances.get('/accounts/id', {
              params: {
                id: loggedInUser?.accountId
              }
            })
            setUserInfo(res?.data?.result)
          }

          fetch()
        }, [updateStatus])

        return (
          <div className='text-black'>
            <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
            <div className='sm:px-16 px-6 mt-10 mb-20'>
              <div className='flex gap-5'>
                <div className='w-[20%] rounded  p-4'>
                  <AvaSection info={userInfo} />
                  <MenuSection
                    info={userInfo}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                </div>
                <div className='w-[80%] h-fit  '>
                  <MainSection
                    activeMenu={activeMenu}
                    info={userInfo}
                    setUpdateStatus={setUpdateStatus}
                  />
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