import { useState } from 'react'
import numberWithComma from '../../../../../utils/numberWithComma'
import { Button } from '../../../../../share/components'
import { setAddedProduct, addItemFromPeek, getShoppingCart } from '../../../../../redux/actionSlice/shoppingCartSlice'

//** Third party components*/
import Rating from '@mui/material/Rating';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ProductVariants = (props) => {

  //** State */
  const dispatch = useDispatch();
  const productStore = useSelector((state) => state.product.productDetail)
  const productList = useSelector((state) => state.cart.productslist)

  const [productValue, setProductValue] = useState(1)
  const inStock = 10
  const notifyWarn = () => toast.warn("Bạn đã chọn tối đa !", {
    pauseOnHover: false,
  });

  // ** handle remove all item in cart
  const handleBuyNow = () => {
  }

  //** handle increse value 
  const handleIncrese = () => {
    if (productValue === inStock) {
      notifyWarn()
      setProductValue(inStock)
    } else {
      setProductValue(prev => prev + 1)
    }
  }

  // ** handle decrese value
  const handleDecrese = () => {
    if (productValue <= 1) {
      setProductValue(1)
    } else {
      setProductValue(prev => prev - 1)
    }
  }

  // ** handle add to cart
  const handleAddToCart = () => {
    dispatch(addItemFromPeek({
      // product: product,
      id: productStore?.productId,
      name: productStore?.productName,
      price: productStore?.price - (productStore?.price * productStore?.discount),
      stock: productStore?.stock,
      inputValue: productValue,
    }))
    dispatch(getShoppingCart())
  }

  useEffect(() => {
    let added;
    if (productStore !== undefined) {
      added = productList?.find((product) => {
        return product.id === productStore?.productId
      })
    }
    if (added !== undefined) {
      dispatch(setAddedProduct({
        id: added.id,
        amountAdded: added.amount,
      }))
    } else {
      dispatch(setAddedProduct({
        id: 0,
        amountAdded: 0,
      }))
    }
  }, [productStore, productList, productValue])

  return (
    <div className='font-maven'>

      <h1 className='text-[25px] font-semibold mb-3'>{productStore?.productName}</h1>
      <div className='flex items-center gap-1'>
        <Rating defaultValue={productStore?.rating} value={productStore?.rating} precision={0.5} readOnly size="small" />
        <span>({productStore?.rating})</span>
        <div className='flex items-center border-l-gray-400 border-solid border-l-[1px] ml-1 pl-1 text-gray-500'>
          <ShoppingBagRoundedIcon />
          <span>{productStore?.soldQuantity}</span>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <p className='text-gray-400 line-through text-[16px]'>{numberWithComma(productStore?.price)}đ</p>
        <p className='text-redError text-[20px] font-semibold'>{numberWithComma(productStore?.price - (productStore?.price * productStore?.discount))}đ</p>
      </div>
      <div className='mt-2 bg-redError px-2 py-1 rounded-full text-white w-fit'>Giảm {productStore?.discount * 100}%</div>
      {/* <div className='mt-5'>
        <p className='font-semibold'>Loại:</p>
        <div className='flex flex-wrap item-center gap-3'>
          <div
            onClick={() => handleSelectSize(1)}
            className={`border px-3 py-1 rounded-[5px] my-3 ${productSize === 1 ? 'bg-primary cursor-default text-white' : 'cursor-pointer'}`}>50g</div>
          <div
            onClick={() => handleSelectSize(2)}
            className={`border px-3 py-1 rounded-[5px] my-3 ${productSize === 2 ? 'bg-primary cursor-default text-white' : 'cursor-pointer'}`}>100g</div>
        </div>
      </div> */}
      <p className='mt-5 font-semibold'>Số lượng trong kho: <span className='font-normal'>{productStore?.stock}</span></p>
      <p className='mt-5 font-semibold'>Số lượng: </p>

      <div className='input-group flex mt-3'>
        <div onClick={() => handleDecrese()} className='w-[35px] h-[35px] rounded-tl-[5px] rounded-bl-[5px] border flex items-center justify-center cursor-pointer'><RemoveIcon /></div>
        <div className='select-none w-[40px] h-[35px] flex items-center justify-center border-t border-b'>{productValue}</div>
        <div onClick={() => handleIncrese()} className='w-[35px] h-[35px] rounded-tr-[5px] rounded-br-[5px] border flex items-center justify-center cursor-pointer'><AddIcon /></div>
      </div>

      <div className='flex gap-5 flex-wrap mt-10'>
        <Button styles='bg-primary rounded-[5px]'>
          <div className='flex items-center gap-2' onClick={() => handleAddToCart()}>
            <AddShoppingCartIcon />
            <p>Thêm vào giỏ</p>
          </div>
        </Button>
        <Button styles='bg-primary rounded-[5px]'>
          <div className='flex items-center gap-2' onClick={() => handleBuyNow()}>
            <ShoppingBagIcon />
            <p>Mua ngay</p>
          </div>
        </Button>
      </div>

      <div className='mt-10'>
        <p className='uppercase font-semibold text-[18px]'>Tại sao nên mua tại nesty</p>
        <div className='flex item-center gap-5 my-5 text-gray-500'>
          <CheckCircleIcon />
          <p>Cam kết sản phẩm nguồn gốc chính hãng</p>
        </div>
        <div className='flex item-center gap-5 my-5 text-gray-500'>
          <LockPersonIcon />
          <p>Cam kết bảo mật thông tin khách hàng</p>
        </div>
        <div className='flex item-center gap-5 my-5 text-gray-500'>
          <ChangeCircleIcon />
          <p>Đổi trả miễn phí nếu sản phẩm lỗi</p>
        </div>
      </div>

    </div>
  )
}

export default ProductVariants