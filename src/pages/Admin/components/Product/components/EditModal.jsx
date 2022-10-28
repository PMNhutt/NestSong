import { useEffect, useState } from 'react'
import instances from '../../../../../utils/plugin/axios'
import LoadingSmall from '../../../../../share/components/LoadingSmall/LoadingSmall'

import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast } from 'react-toastify';
import { MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditModal = (props) => {
    //** states **/
    const [productDetail, setProductDetail] = useState()
    const [producMedia, setProductMedia] = useState()
    const [categoryList, setCategoryList] = useState('')
    const [percentValid, setPercentValid] = useState(false);
    const [categorySelect, setCategorySelect] = useState('')
    const [file, setFile] = useState('');
    const [showErrorThumb, setShowErrorThumb] = useState(false)
    const [fileList, setFileList] = useState([])
    const [showErrorFileList, setShowErrorFileList] = useState(false)
    const notifyWarn = () => toast.warn("Vui lòng điền đầy đủ thông tin cần thiết !", {
        pauseOnHover: false,
    });
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

    //** states to edit */
    const [proName, setProName] = useState('')
    const [originalPrice, setOriginalPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [thumgImg, setThumgImg] = useState('')
    const [detailImages, setDetailImages] = useState([])

    useEffect(() => {
        setProName(productDetail?.productName || '')
        setOriginalPrice(productDetail?.originalPrice || '')
        setDiscount(productDetail?.discount || '')
        setDescription(productDetail?.description || '')
        setCategory(productDetail?.categoryId || '')
        setCategorySelect(productDetail?.categoryName || '')
        setThumgImg(productDetail?.image || '')
        setDetailImages(producMedia?.map((img) => (
            img.smallImage
        )))
    }, [productDetail, producMedia])

    //**  handle close modal  */
    const handleColseModal = () => {
        props?.setIsShowEditModal(false)
    }

    //** call product detail api */
    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get(`/products/id/${props.data?.cateId}/${props.data?.proId}`)
            console.log(res?.data);
            setProductDetail(res?.data?.productDetail)
            setProductMedia(res?.data?.productMedia)
        }

        fetch()
    }, [])

    //** validate number */
    const handleKeyDown = (e, percentVal) => {
        if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110
            || e.keyCode === 189) {
            e.preventDefault();
        }
        if (percentVal) {
            if (percentValid) {
                if ((e.keyCode !== 8 && e.keyCode !== 46)) {
                    e.preventDefault();
                }
            }
        }
    }

    //** handle discountInput check */
    const handleCheckValidDiscount = (e) => {
        var percent = e.target.value;
        setDiscount(percent)
        // console.log(percent);
        if (percent.length === 3) {
            setPercentValid(true);
            if (percent > 100) {
                setDiscount(100)
            }
            if (percent === '000') {
                setDiscount(0)
            }
        } else {
            setPercentValid(false);
        }
    }

    //** handle select category */
    const handleCategoryChange = (e) => {
        // console.log(e );
        // setCategorySelect(e.target.value)
        setCategoryList(e.target.value)
        // props?.setProvinces(e.target.value);
        // props?.handleSelectCategory(e.target.value)
    }

    //** handle select thumbnail */
    const handleSelectThumb = (e) => {
        setShowErrorThumb(false);
        setFile(e.target.files[0])
    }

    //** handle select list image */
    const handleSelectListImage = (e) => {
        // setShowErrorFileList(false)
        const selectedFiles = e.target.files
        const selectedFilesArray = Array.from(selectedFiles)
        // const imagesArray = selectedFilesArray.map((img) => {
        //   return URL.createObjectURL(img)
        // })

        setFileList(selectedFilesArray)
    }

    return (
        <div>
            <div
                onClick={() => handleColseModal()}
                className='top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] fixed z-[900]' />
            <div className='sm:w-max w-full bg-white fixed z-[990] rounded-[5px] left-[50%]
            translate-x-[-50%] top-[50%] translate-y-[-50%]'>
                <div className='font-maven p-5'>
                    <div className='pb-3 text-primary border-b border-gray-300 flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <p className='font-semibold text-[20px] '>Chỉnh sửa sản phẩm</p>
                            <BorderColorIcon />
                        </div>
                        <div
                            onClick={() => handleColseModal()}
                            className='text-redError cursor-pointer p-1'>
                            <CloseIcon />
                        </div>
                    </div>

                    <div className='w-[60vw] '>
                        {
                            (productDetail && producMedia) ?
                                <>
                                    <div className='md:flex block mt-5 gap-5'>

                                        <div className='md:w-[50%] w-full'>
                                            <p className='mb-3 font-medium text-[18px]'>Thông tin sản phẩm</p>
                                            <div className='w-full px-3'>

                                                <div className='gap-3 w-full md:flex-nowrap flex-wrap mb-2'>
                                                    <p className='text-gray-400 mb-2'>Danh mục</p>
                                                    <Select
                                                        displayEmpty
                                                        disableUnderline
                                                        value={categoryList}
                                                        onChange={handleCategoryChange}
                                                        MenuProps={MenuProps}
                                                        renderValue={
                                                            categorySelect !== '' ? () => <p>{categorySelect}</p> : () => <p>Chọn danh mục</p>
                                                        }
                                                        variant="standard"
                                                        className={`bg-white border 
                                                border-gray-400
                                                rounded px-3 w-full`}
                                                    >
                                                        {
                                                            props?.categoryList?.length > 0 ?
                                                                props?.categoryList?.map((cate) =>
                                                                    <MenuItem
                                                                        key={cate.categoryId}
                                                                        value={cate.categoryId}
                                                                        onClick={(e) => setCategorySelect(e.target.innerText)}
                                                                        className="menu-item">
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
                                                <div className='w-[100%] mb-2'>
                                                    <div className=''>
                                                        <p className='text-gray-400 mb-2'>Tên sản phẩm</p>
                                                        <input
                                                            type='text'
                                                            value={proName}
                                                            onChange={(e) => setProName(e.target.value)}
                                                            className='w-full py-2 px-3 bg-white rounded border h-[40px] border-gray-400
                                                focus:border-primary focus:outline-none'/>
                                                    </div>
                                                </div>


                                                <div className='w-full flex gap-4'>

                                                    <div className='w-[100%] mb-2'>
                                                        <div className=''>
                                                            <p className='text-gray-400 mb-2'>Giá gốc</p>
                                                            <input
                                                                onKeyDown={handleKeyDown}
                                                                type='number'
                                                                value={originalPrice}
                                                                onChange={(e) => setOriginalPrice(e.target.value)}
                                                                className='w-full py-2 px-3 bg-white rounded border h-[40px] border-gray-400
                                                focus:border-primary focus:outline-none'/>
                                                        </div>
                                                    </div>

                                                    <div className='w-[100%] mb-2'>
                                                        <div className=''>
                                                            <p className='text-gray-400 mb-2'>Giảm giá</p>
                                                            <input
                                                                onKeyDown={(e) => handleKeyDown(e, true)}
                                                                type='number'
                                                                value={discount}
                                                                onChange={handleCheckValidDiscount}
                                                                className='w-full py-2 px-3 bg-white rounded border h-[40px] border-gray-400
                                                focus:border-primary focus:outline-none'/>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='w-[100%] mb-[20px]'>
                                                    <div className=''>
                                                        <p className='text-gray-400 '>Mô tả</p>
                                                        <textarea
                                                            type='text'
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            rows="4" className=" w-full mt-3 p-2.5 text-gray-900 bg-white rounded border
                                                        border-gray-400 focus:outline-none focus:bg-white focus:border-primary resize-none"
                                                            placeholder="Mô tả sản phẩm..."
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='md:w-[50%] w-full'>
                                            <p className='mb-3 font-medium text-[18px]'>Ảnh mô tả sản phẩm</p>
                                            <p className='text-gray-400 mb-2'>Thumbnail sản phẩm <span className='text-[14px]'>(Click vào để chọn ảnh mới)</span></p>
                                            <label htmlFor="file" className='cursor-pointer w-fit'>

                                                <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => handleSelectThumb(e)} />
                                                {
                                                    file ?
                                                        <img className='w-[120px] h-[120px] object-cover rounded' src={file ? URL.createObjectURL(file) : `${placeholerPicture}`} alt="default-img" />
                                                        :
                                                        <img loading='lazy' className='w-[120px] h-[120px] object-cover rounded' src={`data:image/webp;base64,${thumgImg || ''}`} />
                                                }
                                            </label>

                                            <div className='mt-2 '>
                                                <p className='text-gray-400 mb-2'>Ảnh chi tiết sản phẩm <span className='text-[14px]'>(Click vào để chọn ảnh mới)</span></p>
                                                <div className='max-h-[195px] scroll-bar overflow-x-hidden overflow-y-scroll'>
                                                    <label htmlFor="fileList" className='cursor-pointer w-fit'>
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
                                                                        <img className='w-[120px] h-[120px] object-cover rounded' src={URL.createObjectURL(image)} />
                                                                    </div>
                                                                ))
                                                            }
                                                            {
                                                                !fileList?.length > 0 &&
                                                                detailImages?.map((img, index) => (
                                                                    <div key={index}>
                                                                        <img loading='lazy' className='w-[120px] h-[120px] object-cover rounded' src={`data:image/webp;base64,${img || ''}`} />
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full gap-3'>
                                        <div className='w-full bg-primary rounded-[5px] text-center py-2 text-white font-semibold cursor-pointer'>
                                            Cập nhật sản phẩm
                                        </div>

                                        {/* <div
                                            onClick={() => handleColseModal()}
                                            className='cursor-pointer w-full bg-redError text-center text-white py-2 rounded-[5px] font-semibold'>
                                            Hủy bỏ
                                        </div> */}
                                    </div>
                                </>
                                : <LoadingSmall />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditModal