import { useEffect } from 'react'
import ItemList from './components/ItemList/ItemList'
import PurchaseSection from './components/PurchaseSection/PurchaseSection'

//** images
import { footer } from '../../assets/images'

const Cart = ({ title }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className='font-maven'>
      <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
      <div className='sm:px-16 px-6 mt-10 flex gap-7'>
        <ItemList />
        <div className='w-[30%] '>
          <PurchaseSection />
        </div>
      </div>
    </div>
  )
}

export default Cart