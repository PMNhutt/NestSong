import { useState } from 'react'
import numberWithComma from '../../../../../utils/numberWithComma'
import { removeWholeItem, getShoppingCart, addItemFromPeek, deleteItem, setAddedProduct } from '../../../../../redux/actionSlice/shoppingCartSlice'
// images 
import { product } from '../../../../../assets/images'

//** Third party components*/
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const ItemBody = (props) => {

  //** Const */
  const dispatch = useDispatch()
  const [productValue, setProductValue] = useState(props?.item.amount)
  const cartList = useSelector((state) => state.cart.shoppingCart)
  const notifyWarn = () => toast.warn("Bạn đã chọn tối đa !", {
    pauseOnHover: false,
  });

  // ** handle remove
  const handleRemoveItem = (id) => {
    dispatch(removeWholeItem(id))
    dispatch(getShoppingCart())

    let localList = JSON.parse(localStorage.getItem('LIST_AGENCIES'))
    let added = localList?.find(pro => {
      return pro.id === id
    })
    if (added) {
      let index = localList.indexOf(added)
      localList.splice(index, 1)
      localStorage.setItem('LIST_AGENCIES', JSON.stringify(localList))

    }
  }

  //** handle increse value 
  const handleIncrese = (id) => {
    if (productValue === props?.item.maxAmount) {
      notifyWarn()
      setProductValue(props?.item.maxAmount)
      dispatch(getShoppingCart())
    } else {
      setProductValue(prev => prev + 1)
      dispatch(addItemFromPeek({
        id: id,
        name: props?.item.name,
        price: props?.item?.price,
        stock: props?.item?.maxAmount,
        inputValue: 1,
        categoryName: props?.item?.categoryName,
        thumbImg: props?.item?.ImgSrc,
      }))
      dispatch(getShoppingCart())
    }
  }

  // ** handle decrese value
  const handleDecrese = (id) => {
    if (productValue <= 1) {
      setProductValue(1)
      dispatch(getShoppingCart())
    } else {
      setProductValue(prev => prev - 1)
      dispatch(deleteItem({
        id: id,
        name: props?.item.name,
        price: props?.item?.price,
        stock: props?.item?.maxAmount,
        inputValue: 1,
        ImgSrc: props?.item?.ImgSrc,
        categoryName: props?.item?.categoryName
      }))
      dispatch(setAddedProduct({
        id: id,
        amountAdded: productValue - 1,
      }))
      dispatch(getShoppingCart())
    }
  }

  return (
    <div className='py-6 flex font-maven'>
      <div className='flex w-[60%] gap-5'>
        <div className='w-[80px] h-[80px] bg-cover bg-center bg-no-repeat'
        //  style={{ backgroundImage: `url(${product})` }} 
        >
          <img loading='lazy' className='w-[80px] h-[80px] object-cover' src={`data:image/webp;base64,${props?.item?.ImgSrc || ''}`} />
        </div>
        <div>
          <p className='text-[18px] mb-1 font-medium'>{props?.item?.name}</p>
          <p className='text-[14px] mb-1 text-gray-500'>Loại: {props?.item.categoryName}</p>
          <p
            onClick={() => handleRemoveItem(props?.item.id)}
            className='text-primary font-medium cursor-pointer flex items-center gap-1 underline'> <DeleteForeverIcon sx={{ fontSize: '18px' }} /> Xóa</p>
        </div>
      </div>
      <div className='flex w-[43%] justify-between relative'>
        <div className='input-group flex mr-3'>
          <div onClick={() => handleDecrese(props?.item.id)} className='w-[35px] h-[35px] rounded-tl-[5px] rounded-bl-[5px] border flex items-center justify-center cursor-pointer'><RemoveIcon /></div>
          <div className='select-none w-[40px] h-[35px] flex items-center justify-center border-t border-b'>{productValue}</div>
          <div onClick={() => handleIncrese(props?.item.id)} className='w-[35px] h-[35px] rounded-tr-[5px] rounded-br-[5px] border flex items-center justify-center cursor-pointer'><AddIcon /></div>
        </div>
        <p className='font-medium text-primary'>{numberWithComma(props?.item?.price)}đ</p>
        <p className='font-medium text-primary'>{numberWithComma(props?.item?.price * props?.item?.amount)}đ</p>
      </div>
    </div>
  )
}

export default ItemBody