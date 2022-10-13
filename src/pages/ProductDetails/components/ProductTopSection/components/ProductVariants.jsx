import { useState } from 'react'
import numberWithComma from '../../../../../utils/numberWithComma'
import { Button } from '../../../../../share/components'
import { setAddedProduct, addItemFromPeek, getShoppingCart } from '../../../../../redux/actionSlice/shoppingCartSlice'
import useDebounce from '../../../../../share/hooks/useDebounce'

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
import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ProductVariants = (props) => {

  //** State */
  const dispatch = useDispatch();
  const productStore = useSelector((state) => state.product.productDetail)
  const productList = useSelector((state) => state.cart.productslist)
  const [productValue, setProductValue] = useState(1)
  // const debounced = useDebounce()
  const notifyWarn = () => toast.warn("Bạn đã chọn tối đa !", {
    pauseOnHover: false,
  });
  const notifyWarnSoldOut = () => toast.warn("Sản phẩm này đã hết hàng !", {
    pauseOnHover: false,
  });

  // ** handle buy now
  const handleBuyNow = () => {
    if (productStore?.quantityInStock === 0) {
      notifyWarnSoldOut()
    } else {
      dispatch(addItemFromPeek({
        id: productStore?.productId,
        name: productStore?.productName,
        price: productStore?.salePrice,
        stock: productStore?.quantityInStock,
        inputValue: productValue,
        categoryName: productStore?.categoryName
      }))
      dispatch(getShoppingCart());
    }
  }

  const DelayedLink = ({ delay, replace, state, to, ...props }) => {
    const navigate = useNavigate();
    const timerRef = useRef();
    useEffect(() => () => clearTimeout(timerRef.current), []);
    
    const clickHandler = async (e) => {
      e.preventDefault();
      await handleBuyNow()
      if (productStore?.quantityInStock !== 0) {
        timerRef.current = setTimeout(navigate, delay, to, { replace, state });
      }
    };

    return <Link to={to} {...props} onClick={clickHandler} />;
  };

  //** handle increse value 
  const handleIncrese = () => {
    if (productValue === productStore?.quantityInStock) {
      notifyWarn()
      setProductValue(productStore?.quantityInStock)
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
    if (productStore?.quantityInStock === 0) {
      notifyWarnSoldOut()
    } else {
      dispatch(addItemFromPeek({
        // product: product,
        id: productStore?.productId,
        name: productStore?.productName,
        price: productStore?.salePrice,
        stock: productStore?.quantityInStock,
        inputValue: productValue,
        categoryName: productStore?.categoryName
      }))
      dispatch(getShoppingCart())
    }
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
        <p className='text-gray-400 line-through text-[16px]'>{numberWithComma(productStore?.originalPrice)}đ</p>
        <p className='text-redError text-[20px] font-semibold'>{numberWithComma(productStore?.salePrice)}đ</p>
      </div>
      <div className='mt-2 bg-redError px-2 py-1 rounded-full text-white w-fit'>Giảm {productStore?.discount * 100}%</div>
      <p className='mt-5 font-semibold'>Loại: <span className='font-normal'>{productStore?.categoryName}</span></p>
      <p className='mt-5 font-semibold'>Số lượng trong kho: <span className='font-normal'>{productStore?.quantityInStock}</span></p>
      <p className='mt-5 font-semibold'>Số lượng: </p>

      <div className='input-group flex mt-3'>
        <div onClick={() => handleDecrese()} className='w-[35px] h-[35px] rounded-tl-[5px] rounded-bl-[5px] border flex items-center justify-center cursor-pointer'><RemoveIcon /></div>
        <div className='select-none w-[40px] h-[35px] flex items-center justify-center border-t border-b'>{productValue}</div>
        <div onClick={() => handleIncrese()} className='w-[35px] h-[35px] rounded-tr-[5px] rounded-br-[5px] border flex items-center justify-center cursor-pointer'><AddIcon /></div>
      </div>

      <div className='flex gap-5 flex-wrap mt-10'>
        <div onClick={() => handleAddToCart()}>
          <Button styles='bg-primary rounded-[5px]'>
            <div className='flex items-center gap-2'>
              <AddShoppingCartIcon />
              <p>Thêm vào giỏ</p>
            </div>
          </Button>
        </div>
        <DelayedLink delay={1000} to='/cart'>
            <Button styles='bg-primary rounded-[5px]'>
              <div className='flex items-center gap-2' >
                <ShoppingBagIcon />
                <p>Mua ngay</p>
              </div>
            </Button>
        </DelayedLink>
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