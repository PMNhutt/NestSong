import React from 'react'
import { footer, certificate } from '../../assets/images'
import styles from '../../share/style'
import { whiteLogo } from '../../assets'

//** Third party components */
import { Link } from 'react-router-dom'
import {FaPhoneAlt} from 'react-icons/fa'
import {IoMdMail, IoIosPin} from 'react-icons/io'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="text-white font-maven bg-cover w-full h-max"
      style={{ backgroundImage: `url(${footer})` }}>
      <div className={`${styles.paddingX} pt-[8%] flex flex-wrap justify-between gap-[10%]`}>

        <div className='flex-1'>
          <Link to='/'>
            <div className={`${styles.flexCenter} flex-col cursor-pointer`}>
              <div className='w-[70px] h-[70px] bg-contain bg-no-repeat' style={{ backgroundImage: `url(${whiteLogo})` }} />
              <p className='text-[20px] tracking-[5px] uppercase select-none my-3'>NESTY</p>
            </div>
          </Link>
          <p className='pb-5'>Điều đặc biệt làm nên và chỉ có duy nhất ở Nesty là khách hàng không còn phải đau đầu chọn lựa và lo lắng về chất lượng, hiệu quả hay mẫu mã của sản phẩm nữa mà vẫn có giá thành luôn tốt nhất.</p>
        </div>

        <div>
          <h2 className='uppercase text-[18px] font-semibold'>Thông tin liên hệ</h2>
          <div className='bg-white w-[30px] h-[2px] mt-[8px] mb-7'/>
          <p className='flex items-center gap-3 my-3'><FaPhoneAlt className='text-[18px]'/>0901 652 545</p>
          <p className='flex items-center gap-3 my-3'><FaPhoneAlt className='text-[18px]'/>0901 653 154</p>
          <p className='flex items-center gap-3 my-3'><IoMdMail className='text-[18px]'/>Cskh.nesty@gmail.com</p>
          <p className='flex items-center gap-3 my-6'><IoIosPin className='text-[24px]'/>123 Điện Biên Phủ, Phường 3, Quận 3, TP.HCM</p>
          <p className='flex items-center gap-3 my-6'><IoIosPin className='text-[24px]'/>5 Lò Đúc, Phạm Đình Hổ, Hai Bà Trưng, Hà Nội</p>
          <p className='flex items-center gap-3 my-6'><IoIosPin className='text-[24px]'/>123 Nguyễn Tri Phương, Quận Thanh Khê, Đà Nẵng</p>
        </div>

        <div>
          <h2 className='uppercase text-[18px] font-semibold'>Hỗ trợ</h2>
          <div className='bg-white w-[30px] h-[2px] mt-[8px] mb-7'/>
          <p className='my-3 cursor-pointer hover:text-primary'>Giới thiệu</p>
          <p className='my-3 cursor-pointer hover:text-primary'>Liên hệ</p>
          <p className='my-3 cursor-pointer hover:text-primary'>Câu hỏi thường gặp</p>
          <p className='my-3 cursor-pointer hover:text-primary'>Hướng dẫn thanh toán</p>
          <p className='my-3 cursor-pointer hover:text-primary'>Chính sách đổi trả hàng</p>
          <p className='my-3 cursor-pointer hover:text-primary'>Chính sách giao nhận hàng</p>
          <p className='my-3 cursor-pointer hover:text-primary'>Chính sách bảo mật</p>
          <div className='w-[170px] h-[42px] bg-contain bg-no-repeat my-6' style={{ backgroundImage: `url(${certificate})`}}/>
        </div>
      </div>
      <p className='text-center py-5'>{year} © Nesty. All Rights Reserved</p>
    </footer>
  )
}

export default Footer