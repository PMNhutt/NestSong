import ItemList from './components/ItemList/ItemList'
import PurchaseSection from './components/PurchaseSection/PurchaseSection'

//** images
import { footer } from '../../assets/images'

const CartContainer = () => {
    return (
        <div className='font-maven'>
            <div className='w-full h-[180px] rotate-180 bg-cover' style={{ backgroundImage: `url(${footer})` }} />
            <div className='sm:px-16 px-6 mt-10 mb-20 flex gap-7 md:flex-row flex-col'>
                <ItemList />
                <div className='md:w-[30%] w-full'>
                    <PurchaseSection />
                </div>
            </div>
        </div>
    )
}

export default CartContainer