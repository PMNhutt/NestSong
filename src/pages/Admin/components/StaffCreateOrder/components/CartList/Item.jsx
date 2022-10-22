import { useState, useEffect } from 'react'
import { product } from '../../../../../../assets/images'
import numberWithCommas from '../../../../../../utils/numberWithComma'
import truncate from '../../../../../../utils/truncate'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux'
import { removeWholeItem, setAddedProduct, addItemToCart, deleteItem } from '../../../../../../redux/actionSlice/managementSlice'

const Item = (props) => {
    const dispatch = useDispatch()
    const [productValue, setProductValue] = useState(props?.item.amount)

    // ** handle remove
    const handleRemoveItem = (id) => {
        dispatch(removeWholeItem(id))
    }
    //** handle increse value 
    const handleIncrese = (id) => {
        if (productValue === props?.item.maxAmount) {
            notifyWarn()
            setProductValue(props?.item.maxAmount)
            // dispatch(getShoppingCart())
        } else {
            setProductValue(prev => prev + 1)
            dispatch(addItemToCart({
                id: id,
                name: props?.item.name,
                price: props?.item?.price,
                stock: props?.item?.maxAmount,
                inputValue: 1,
                categoryName: props?.item?.categoryName
            }))
            // dispatch(getShoppingCart())
        }
    }

    // ** handle decrese value
    const handleDecrese = (id) => {
        if (productValue <= 1) {
            setProductValue(1)
            // dispatch(getShoppingCart())
        } else {
            setProductValue(prev => prev - 1)
            dispatch(deleteItem({
                id: id,
                name: props?.item.name,
                price: props?.item?.price,
                stock: props?.item?.maxAmount,
                inputValue: 1,
                categoryName: props?.item?.categoryName
            }))
            dispatch(setAddedProduct({
                id: id,
                amountAdded: productValue - 1,
            }))
            // dispatch(getShoppingCart())
        }
    }

    return (
        <div className='font-maven flex gap-4 py-5'>
            <div className='bg-white w-[80px] h-[80px] bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${props?.item?.image ? props?.item.image : product})` }} />
            <div className='flex-1 relative'>
                <div
                    onClick={() => handleRemoveItem(props?.item.id)}
                    className='text-redError cursor-pointer absolute top-0 right-0'>
                    <CloseIcon />
                </div>
                <p className='max-w-[85%] text-[18px] font-semibold leading-[1.2]'>
                    {props?.item?.name ? truncate(props?.item.name, 29) : truncate('Yến sào thượng hạng số 1 ngon tuyệt vời bá cháy con bọ chét', 29)}
                </p>
                <p className='text-[14px] my-1 text-gray-500'>Loại: {props?.item?.categoryName ? props?.item?.categoryName : '50kg'}</p>
                <div className='mt-1 flex items-center justify-between'>
                    <div className='flex items-center gap-3 mt-1 text-primary'>
                        <p className='text-[16px] font-semibold'>{props?.item?.price ? `${numberWithCommas(props?.item?.price)}đ` : `${numberWithComma(200000)}đ`}</p>
                        <p className='text-[16px] font-semibold'>{`x${props?.item?.amount ? props?.item?.amount : 3}`}</p>
                    </div>
                    <div className='flex gap-2'>
                        <div onClick={() => handleDecrese(props?.item.id)} className='w-[20px] h-[20px] hover:bg-gray-200 border flex items-center justify-center cursor-pointer'><RemoveIcon /></div>
                        <div onClick={() => handleIncrese(props?.item.id)} className='w-[20px] h-[20px] hover:bg-gray-200 border flex items-center justify-center cursor-pointer'><AddIcon /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item