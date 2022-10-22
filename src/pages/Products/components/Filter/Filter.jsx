import { useState, useEffect } from 'react'
import numberWithComma from '../../../../utils/numberWithComma'

//** Third party components*/
import { Input } from '@mui/material'
import Slider from '@mui/material/Slider';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux'

const Filter = (props) => {

    // ** State
    const [activeCategory, setActiveCategory] = useState(null)
    const [min, setMin] = useState(100000);
    const [max, setMax] = useState(1000000);

    const handlePickCategory = (id) => {
        setActiveCategory(id)
        props?.setCateId(id)
    }

    // handle change price filter
    const handleChangePrice = (event, newValue) => {
        setMin(newValue[0]);
        setMax(newValue[1]);
    };

    function handleFilterPrice(minVal, maxVal) {
        // console.log("min: ", minVal, "max: ", maxVal);
        props?.setMinPrice(minVal)
        props?.setMaxPrice(maxVal)
    }

    return (
        <div className='font-maven text-black md:pl-16 pl-6 md:pr-0 pr-6 mt-[80px] sticky top-[100px] sm:mb-20 mb-3'>
            <div className='shadow-md rounded-[5px] py-3 px-5 border'>
                <div className=''>
                    <h1 className='font-semibold text-[20px] mb-5'>Tìm kiếm</h1>
                    <Input placeholder='Tìm kiếm ở đây...' onChange={(e) => props?.setSearchVal(e.target.value)} />
                </div>
                <div className='py-5 border-b border-solid border-gray-200'>
                    <h1 className='font-semibold text-[20px] my-5'>Danh mục</h1>
                    <div className='md:block flex flex-wrap'>
                        <div
                            onClick={() => handlePickCategory(null)}
                            className={`cursor-pointer my-3 py-2 px-4 text-center ${activeCategory === null ? 'bg-blue-200 shadow-md' : ''} 
                        rounded-[5px] hover:bg-blue-200`}
                        >
                            Tất cả sản phẩm
                        </div>
                        {props?.filter?.map(item => (
                            <div
                                key={item.categoryId}
                                onClick={() => handlePickCategory(item.categoryId)}
                                className={`cursor-pointer my-3 py-2 px-4 text-center ${activeCategory === item.categoryId ? 'bg-blue-200 shadow-md' : ''} 
                        rounded-[5px] hover:bg-blue-200`}
                            >
                                {item.categoryName}
                            </div>
                        ))}
                    </div>

                </div>
                <div className='py-5'>
                    <h1 className='font-semibold text-[20px] mb-5'>Lọc giá</h1>
                    <Slider
                        // getAriaLabel={() => 'Minimum distance'}
                        value={[min, max]}
                        min={100000}
                        max={1000000}
                        onChange={handleChangePrice}
                        valueLabelDisplay="auto"
                        // getAriaValueText={valuetext}
                        disableSwap
                    />
                    <div className="flex gap-1 text-primary font-semibold">
                        <p className='text-[18px]'>{numberWithComma(min)} ₫</p>
                        <span> <RemoveIcon /> </span>
                        <p className='text-[18px]'>{numberWithComma(max)} ₫</p>
                    </div>
                    <div className="py-1 px-5 rounded-[5px] hover:bg-primary transition transition-duration-[2s] bg-black w-fit mt-3 text-white cursor-pointer" onClick={() => handleFilterPrice(min, max)}>
                        Lọc
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter