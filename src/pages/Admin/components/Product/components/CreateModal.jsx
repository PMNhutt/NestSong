import { useState, useEffect, useRef } from 'react'
import instances from '../../../../../utils/plugin/axios';

import { MenuItem, Select } from '@mui/material';
import Dropzone from "react-dropzone"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import validator from 'validator';
import { toast } from 'react-toastify';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CloseIcon from '@mui/icons-material/Close';

import { icCamera } from '../../../../../assets'
import { product, placeholerPicture, addMoreImage } from '../../../../../assets/images';

const CreateModal = (props) => {

  //**Const */
  // const [isShowModal, setIsShowModal] = useState(true)
  const [provinces, setProvinces] = useState('')
  const [categoryList, setCategoryList] = useState('')
  const [file, setFile] = useState('');
  const [showErrorThumb, setShowErrorThumb] = useState(false)
  const [fileList, setFileList] = useState([])
  const [showErrorFileList, setShowErrorFileList] = useState(false)
  const [showErrorLimitFile, setShowErrorLimitFile] = useState(false)
  const [percentValid, setPercentValid] = useState(false);
  const [discountValue, setDiscountValue] = useState('')
  const [priceValue, setPriceValue] = useState('')
  const [priceValid, setPriceValid] = useState(false)
  const notifyWarn = () => toast.warn("Vui lòng điền đầy đủ thông tin cần thiết !", {
    pauseOnHover: false,
  });
  const notifyPriceLimit = () => toast.warn("Giá bán phải nằm trong khoảng 10k - 2tr !", {
    pauseOnHover: false,
  });
  //** validate number */
  const handleKeyDown = (e, percentVal) => {
    if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110
      || e.keyCode === 189 || e.keyCode === 109) {
      e.preventDefault();
    }
    if (percentVal) {
      if (percentValid || priceValid) {
        if ((e.keyCode !== 8 && e.keyCode !== 46)) {
          e.preventDefault();
        }
      }
    }
  }

  //** handle discountInput check */
  const handleCheckValidDiscount = (e) => {
    var percent = e.target.value;
    setDiscountValue(percent)
    // console.log(percent);
    if (percent.length === 3) {
      setPercentValid(true);
      if (percent > 100) {
        setDiscountValue(100)
      }
      if (percent === '000') {
        setDiscountValue(0)
      }
    } else {
      setPercentValid(false);
    }
  }

  //** handle sale price check */
  const handleCheckPriceInput = (e) => {
    var price = e.target.value
    setPriceValue(price)

    if (price.length === 7) {
      setPriceValid(true)
      if (price > 2000000) {
        setPriceValue(2000000)
      }
      if (price <= 10000) {
        setPriceValue(10000)
      }
    } else {
      setPriceValid(false)
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

  // useEffect(() => {
  //   if (props.isShowModal) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = 'unset'
  //   }
  // }, [props.isShowModal])

  //** handle close modal **/
  const handleCloseCreateModal = () => {
    props.setIsShowModal(false)
    // ** clear input data
    props?.setCreateInfo({
      name: {
        value: '',
        error: false,
      },
      price: {
        value: '',
        error: false,
      },
      amount: {
        value: '',
        error: false,
      },
      discount: {
        value: '',
        error: false,
      },
      note: '',
      category: {
        value: '',
        error: false,
      },
    })
  }

  //** handle select thumbnail */
  const handleSelectThumb = (e) => {
    setShowErrorThumb(false);
    setFile(e.target.files[0])
  }

  //** handle select list image */
  const handleSelectListImage = (e) => {
    setShowErrorFileList(false)
    const selectedFiles = e.target.files
    const selectedFilesArray = Array.from(selectedFiles)
    // const imagesArray = selectedFilesArray.map((img) => {
    //   return URL.createObjectURL(img)
    // })
    if (selectedFilesArray.length <= 4) {
      setShowErrorLimitFile(false)
      setFileList(selectedFilesArray)
    } else {
      setShowErrorLimitFile(true)
    }
  }

  //** handle cerate product */
  const handleCreateProduct = async () => {
    let formData = new FormData();
    if ((props?.createInfo?.category?.value !== "")
      && (props?.createInfo?.name?.value !== "")
      && (props?.createInfo?.price?.value !== "")
      && (props?.createInfo?.discount?.value !== "")
      && (file !== "")
      && (fileList?.length > 0)) {

      if (props?.createInfo?.price?.value > 10000) {

        formData.append("ProductName", props?.createInfo?.name?.value)
        formData.append("CategoryId", props?.createInfo?.category?.value)
        formData.append("Price", parseInt(props?.createInfo?.price?.value))
        formData.append("Discount", parseInt(props?.createInfo?.discount?.value))
        formData.append("Description", props.createInfo?.note == '' ? 'Không có mô tả' : props.createInfo?.note)
        formData.append("Thumbnail", file)
        fileList.forEach((item, index) => {
          formData.append(`Image${index + 1}`, item)
        })
        // console.log([...formData])
        toast.promise(
          instances.post('/products', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }).then(() => {
            props?.setUpdateTable(prev => !prev)
            handleCloseCreateModal()
          }),
          {
            pending: 'Đang tạo sản phẩm',
            success: 'Đã tạo thành công! 👌',
            error: 'Tạo sản phẩm thất bại'
          }
        )
      } else {
        notifyPriceLimit()
      }
      // console.log({
      //   ProductName: props?.createInfo?.name?.value,
      //   CategoryId: props?.createInfo?.category?.value,
      //   Price: parseInt(props?.createInfo?.price?.value),
      //   Discount: parseInt(props?.createInfo?.discount?.value),
      //   Description: props.createInfo?.note,
      //   Thumbnail: file,
      //   DetailImages: fileList,
      // });
    } else {
      notifyWarn()
      if (props?.createInfo?.category?.value == "") {
        props?.setCreateInfo(currVal => ({
          ...currVal,
          category: {
            value: '',
            error: true
          }
        }))
      }
      if (props?.createInfo?.name?.value == "") {
        props?.setCreateInfo(currVal => ({
          ...currVal,
          name: {
            value: '',
            error: true
          }
        }))
      }
      if (props?.createInfo?.price?.value == "") {
        props?.setCreateInfo(currVal => ({
          ...currVal,
          price: {
            value: '',
            error: true
          }
        }))
      }
      if (props?.createInfo?.discount?.value == "") {
        props?.setCreateInfo(currVal => ({
          ...currVal,
          discount: {
            value: '',
            error: true
          }
        }))
      }
      if (file == "") {
        setShowErrorThumb(true)
      }
      if (!fileList?.length > 0) {
        setShowErrorFileList(true)
      }
    }
  }

  return (
    <div>
      <div
        onClick={() => handleCloseCreateModal()}
        className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[900]' />
      <div className='sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>
        <div className='font-maven p-5'>
          <div className='text-primary pb-2 border-b border-gray-300 flex justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <p className='font-semibold text-[20px] p-1'>Thêm mới sản phẩm</p>
              <LibraryAddIcon />
            </div>
            <div
              onClick={() => handleCloseCreateModal()}
              className='text-redError cursor-pointer'>
              <CloseIcon />
            </div>
          </div>

          <div className='flex mt-4 gap-3 w-full md:flex-nowrap flex-wrap mb-2'>
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
              className={`bg-white border ${props?.createInfo?.category.error ? 'border-red-500' : 'border-gray-400'} rounded px-3 w-full`}
            >
              {
                props?.categoryList?.length > 0 ?
                  props?.categoryList?.map((cate) =>
                    <MenuItem key={cate.categoryId} value={cate.categoryId} className="menu-item">
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
            <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.name.error ? 'border-red-500' : 'border-gray-400'}
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
              <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.price.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                required type="number"
                onBlur={(e) => props?.handleInputPrice(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, true)}
                value={priceValue}
                onChange={handleCheckPriceInput}
              />
              <div className='placeholder'>
                Giá bán (vnd) <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
              </div>
            </div>

            {/* <div className="mb-2 relative input-placeholer">
              <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.name.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                required type="number"
                onBlur={(e) => props?.handleSelectAmount(e.target.value)}
              />
              <div className='placeholder'>
                Số lượng <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
              </div>
            </div> */}

            <div className="mb-2 relative input-placeholer">
              <input className={`bg-white appearance-none border-[1.5px] ${props?.createInfo?.discount.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                required type="number"
                onBlur={(e) => props?.handleInputDiscount(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, true)}
                onChange={handleCheckValidDiscount}
                value={discountValue}
              />
              <div className='placeholder'>
                Giảm giá (%) <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
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
            <label htmlFor="file" className='cursor-pointer w-fit'>
              Chọn ảnh thumbnail:<span className='text-redError font-medium text-[20px]'>*</span>
              {' '}
              <DriveFolderUploadIcon className="upload-icon" /> {showErrorThumb && <span className='text-redError text-[14px]'>Ảnh thumbnail không được trống!</span>}
              <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => handleSelectThumb(e)} />
              <img className='w-[60px] h-[60px] object-cover rounded' src={file ? URL.createObjectURL(file) : `${placeholerPicture}`} alt="default-img" />
            </label>
          </div>

          <div className='mt-2 max-h-[195px] scroll-bar overflow-x-hidden overflow-y-scroll'>
            <label htmlFor="fileList" className='cursor-pointer w-fit'>
              Chọn ảnh mô tả chi tiết:<span className='text-redError font-medium text-[20px]'>*</span>
              {' '}
              <DriveFolderUploadIcon className="upload-icon" />
              {showErrorFileList && <span className='text-redError text-[14px]'>Ảnh chi tiết không được trống!</span>}
              {showErrorLimitFile && <span className="text-redError text-[14px]">Chọn tối đa 4 ảnh mô tả!</span>}
              <input
                multiple
                name='fileList'
                accept='image/png, image/jpeg, image/webp, image/jpg'
                type="file" id="fileList"
                style={{ display: 'none' }}
                onChange={handleSelectListImage} />
              <div className='flex gap-1 flex-wrap'>
                {
                  fileList &&
                  fileList?.map((image, index) => (
                    <div key={index}>
                      <img className='w-[60px] h-[60px] object-cover rounded' src={URL.createObjectURL(image)} />
                    </div>
                  ))
                }
                {
                  !fileList?.length > 0 &&
                  <>
                    <img className='w-[60px] h-[60px] object-cover' src={placeholerPicture} />
                    <img className='w-[60px] h-[60px] object-cover' src={addMoreImage} />
                  </>
                }
              </div>
            </label>
          </div>

          <textarea
            onBlur={(e) => props?.handleInputNote(e.target.value)}
            rows="4" className="mt-3 p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
                focus:outline-none focus:bg-white focus:border-primary resize-none" placeholder="Mô tả sản phẩm..."></textarea>

          <div
            onClick={() => handleCreateProduct()}
            className={`bg-primary select-none cursor-pointer py-2 px-4 rounded text-white text-center mt-4`}>Tạo sản phẩm</div>

        </div>
      </div>
    </div>
  )
}

export default CreateModal