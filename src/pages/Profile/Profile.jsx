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
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

  useEffect(() => {
    //Close ava modal
    dispatch(setShowModal(false))
    dispatch(deleteProductDetail())
  }, [])


  if (loggedInUser) {
    if (Object.keys(loggedInUser).length === 0
      && loggedInUser.constructor === Object) {
      return <Navigate replace to="/" />
    } else {
      if (loggedInUser.authorizeRole === 'User') {
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
        }, [])

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