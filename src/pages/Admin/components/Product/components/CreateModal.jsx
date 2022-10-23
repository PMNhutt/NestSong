import { useState, useEffect, useRef } from 'react'
import { MenuItem, Select } from '@mui/material';
import Dropzone from "react-dropzone"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import validator from 'validator';

import { icCamera } from '../../../../../assets'
import { product } from '../../../../../assets/images';

const provincesData = [
  {
    "agencyId": "11111111-1111-1111-1111-111111111110",
    "address": "Bình Dương",
    "storeProducts": []
  },
  {
    "agencyId": "11111111-1111-1111-1111-111111111111",
    "address": "Hồ Chí Minh",
    "storeProducts": []
  },
  {
    "agencyId": "11111111-1111-1111-1111-111111111112",
    "address": "Hà Nội",
    "storeProducts": []
  },
  {
    "agencyId": "11111111-1111-1111-1111-111111111113",
    "address": "Vũng Tàu",
    "storeProducts": []
  },
  {
    "agencyId": "11111111-1111-1111-1111-111111111114",
    "address": "Đà Nẵng",
    "storeProducts": []
  },
  {
    "agencyId": "11111111-1111-1111-1111-111111111115",
    "address": "Cần Thơ",
    "storeProducts": []
  },
  {
    "agencyId": "11111111-1111-1111-1111-111111111116",
    "address": "Trà Vinh",
    "storeProducts": []
  },
  {
    "agencyId": "11111111-1111-1111-1111-111111111117",
    "address": "Huế",
    "storeProducts": []
  },
  {
    "agencyId": "11111111-1111-1111-1111-111111111118",
    "address": "Bắc Giang",
    "storeProducts": []
  },
  {
    "agencyId": "11111111-1111-1111-1111-111111111119",
    "address": "Lào Cai",
    "storeProducts": []
  },
  {
    "agencyId": "db944b53-e861-4f3c-a5b3-6bbebbbcce5b",
    "address": "TPHCM",
    "storeProducts": []
  }
]
const CreateModal = (props) => {

  //**Const */
  // const [isShowModal, setIsShowModal] = useState(true)
  const [provinces, setProvinces] = useState('')
  const [categoryList, setCategoryList] = useState('')
  const [file, setFile] = useState('');
  const [numberValid, setNumberValid] = useState(false);

  //** validate number */
  const handleKeyDown = (e) => {
    if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110) {
      e.preventDefault();
    }
    if (phoneValid) {
      if ((e.keyCode !== 8 && e.keyCode !== 46)) {
        e.preventDefault();
      }
    }
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const Placeholder = ({ children }) => {
    return <div className='text-gray-400'>{children} <span className='text-redError text-[18px] font-semibold'>*</span></div>;
  };

  const handleCategoryChange = (e) => {
    setProvinces(e.target.value)
    setCategoryList(e.target.value)
    // props?.setProvinces(e.target.value);
    props?.handleSelectCategory(e.target.value)
  }

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value)
    // props?.setDistrict(e.target.value);
    props?.handleSelectDistrict(e.target.value)
  }

  const handleWardChange = (e) => {
    setWard(e.target.value)
    // props?.setWard(e.target.value);
    props?.handleSelectWard(e.target.value)
  }

  useEffect(() => {
    if (props.isShowModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [props.isShowModal])

  return (
    <div>
      <div
        onClick={() => props.setIsShowModal(false)}
        className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[900]' />
      <div className='sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>
        <div className='font-maven p-5'>

          <div className='flex mt-3 gap-3 w-full md:flex-nowrap flex-wrap mb-2'>
            <Select
              displayEmpty
              disableUnderline
              value={categoryList}
              onChange={handleCategoryChange}
              MenuProps={MenuProps}
              renderValue={
                provinces !== '' ? undefined : () => <Placeholder>Chọn danh mục</Placeholder>
              }
              variant="standard"
              className={`bg-white border ${props?.deliveryInfo?.provinces.error ? 'border-red-500' : 'border-gray-400'} rounded px-3 w-full`}
            >
              {
                props?.categoryList?.length > 0 ?
                  props?.categoryList?.map((cate) =>
                    <MenuItem key={cate.categoryId} value={cate.categoryName} className="menu-item">
                      <p className="item-label font-maven">
                        {cate.categoryName}
                      </p>
                    </MenuItem>
                  ) :
                  <MenuItem disabled value='' className="menu-item">
                    <em>Không tìm thấy dữ liệu</em>
                  </MenuItem>
              }
            </Select>
          </div>

          <div className="mb-2 relative input-placeholer">
            <input className={`bg-white appearance-none border-[1.5px] ${props?.deliveryInfo?.name.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
              required type="text"
              onBlur={(e) => props?.handleInputName(e.target.value)}
            />
            <div className='placeholder'>
              Tên sản phẩm <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
            </div>
          </div>

          <div className='flex gap-3'>
            <div className="mb-2 relative input-placeholer">
              <input className={`bg-white appearance-none border-[1.5px] ${props?.deliveryInfo?.name.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                required type="number"
                onBlur={(e) => props?.handleInputPrice(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className='placeholder'>
                Giá bán <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
              </div>
            </div>

            {/* <div className="mb-2 relative input-placeholer">
              <input className={`bg-white appearance-none border-[1.5px] ${props?.deliveryInfo?.name.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                required type="number"
                onBlur={(e) => props?.handleSelectAmount(e.target.value)}
              />
              <div className='placeholder'>
                Số lượng <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
              </div>
            </div> */}

            <div className="mb-2 relative input-placeholer">
              <input className={`bg-white appearance-none border-[1.5px] ${props?.deliveryInfo?.name.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                required type="number"
                onBlur={(e) => props?.handleInputDiscount(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className='placeholder'>
                Giảm giá () <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
              </div>
            </div>
          </div>

          {/* <div className='relative flex mt-3 gap-3 w-full md:flex-nowrap flex-wrap'>
            <Select
              displayEmpty
              disableUnderline
              value={provinces}
              onChange={handleCategoryChange}
              MenuProps={MenuProps}
              renderValue={
                provinces !== '' ? undefined : () => <Placeholder>Chọn chi nhánh giao hàng</Placeholder>
              }
              variant="standard"
              className={`bg-white border 
                        ${props?.createInfo?.provinces.error ? 'border-red-500' : 'border-gray-400'} z-[99999] absolute rounded px-3 w-full`}
            >
              {
                props?.provinces?.length > 0 ?
                  props?.provinces?.map((province) =>
                    <MenuItem key={province.agencyId} value={province.address} className="menu-item">
                      <p className="item-label font-maven">
                        {province.address}
                      </p>
                    </MenuItem>
                  ) :
                  <MenuItem disabled value='' className="menu-item">
                    <em>Không tìm thấy dữ liệu</em>
                  </MenuItem>
              }
            </Select>
          </div> */}

          <div className='my-2'>
            {/* <Dropzone accept={'image/*'} maxFiles={10} onDrop={(acceptedFiles) => {
              if (acceptedFiles.length > 0) {
                setImages(acceptedFiles)
              }
            }}>
              {({ getRootProps, getInputProps }) => (
                <div style={
                  {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                  }
                } {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone> */}
            <label htmlFor="file" className='cursor-pointer'>
              Chọn ảnh sản phẩm:
              {' '}
              <DriveFolderUploadIcon className="upload-icon" />
            </label>
            <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
            <img className='w-[60px]' src={file ? URL.createObjectURL(file) : `${product}`} alt="default-img" />
          </div>

          <textarea
            // onBlur={(e) => props?.handleInputNote(e.target.value)} 
            rows="4" className="mt-3 p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
                focus:outline-none focus:bg-white focus:border-primary resize-none" placeholder="Mô tả..."></textarea>

          <div className='bg-primary cursor-pointer py-2 px-4 rounded text-white text-center mt-4'>Tạo sản phẩm</div>

        </div>
      </div>
    </div>
  )
}

export default CreateModal