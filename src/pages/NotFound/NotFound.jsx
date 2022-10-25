import pageNotFound from '../../share/lottie/pageNotFound.json'
import { Button } from '../../share/components'
import { useEffect } from 'react';
import {deleteProductDetail} from '../../redux/actionSlice/productSlice'

// ** Third party libraries
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import { TbArrowBackUp } from 'react-icons/tb'
import { FcBadDecision } from "react-icons/fc";
import { useDispatch } from 'react-redux';

const NotFound = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(deleteProductDetail())
  }, [])

  return (
    <>
      <div className="flex flex-col justify-center w-full items-center">
        <Lottie
          animationData={pageNotFound}
          loop={true}
          controls={false}
          className="h-[70vh]"
        />
        <p className="text-black mb-5 text-[20px] flex gap-3">Đường dẫn không tồn tại... <FcBadDecision className="w-[30px] h-[30px]" /></p>
        <Link to='/'>
          <Button styles="rounded-[50px] bg-primary">
            Về trang chủ <TbArrowBackUp className="inline-block" />
          </Button>
        </Link>
      </div>
    </>
  )
}

export default NotFound