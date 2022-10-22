import { useEffect, useState } from 'react'
import { setShowModal } from '../../redux/actionSlice/accountSlice'
import instances from '../../utils/plugin/axios'

//** Third party libraries */
import { useDispatch } from 'react-redux'

// ** images */
import { footer } from '../../assets/images'

const Profile = () => {

  //** States */
  const dispatch = useDispatch()
  const [imageTest, setImageTest] = useState()

  useEffect(() => {
    //Close ava modal
    dispatch(setShowModal(false))
  }, [])

  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/admin/products')
      let product = res?.data?.result?.find(instance => instance.productId === 'fab99040-52fc-419d-b14e-8f6dd12da4bc')
      setImageTest(product.image)
    }

    fetch()
  }, [])

  return (
    <div className='text-black'>
      <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
      <div className='sm:px-16 px-6 mt-10 mb-20'>
        <div className='flex gap-5'>
          <div className='w-[20%] rounded border shadow-md p-4'>
            user menu
            {
              imageTest &&
              <img className='w-[200px]' src={`data:image/webp;base64,${imageTest}`}/>
            }
          </div>
          <div className='w-[80%] rounded border shadow-md p-4'>
            interactive panel
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile