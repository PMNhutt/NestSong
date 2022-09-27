import { useState } from 'react'

//** Third party components*/
import { MenuItem, Select } from '@mui/material';

const SortComponent = () => {
    //** States */
    const [sortType, setSortType] = useState(1)
    const [viewType, setViewType] = useState(1)

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    }

    const handleViewChange = (e) => {
        setViewType(e.target.value)
    }

    return (
        <div className='py-5 px-5 shadow-md rounded-[5px] mb-2 flex gap-10 justify-end flex-wrap'>
            <div className='flex items-center gap-3'>
                <p className='font-semibold'>Sắp xếp theo:</p>
                <Select
                    disableUnderline
                    value={sortType}
                    onChange={handleSortChange}
                    variant="standard"
                    className="bg-gray-200 rounded-[5px] px-2"
                >
                    <MenuItem value={1} className="menu-item">
                        <p className="item-label font-maven">
                            Giá: giảm dần
                        </p>
                    </MenuItem>
                    <MenuItem value={2} className="menu-item">
                        <p className="item-label font-maven">
                            Giá: tăng dần
                        </p>
                    </MenuItem>
                    <MenuItem value={3} className="menu-item">
                        <p className="item-label font-maven">
                            Tên: A - Z
                        </p>
                    </MenuItem>
                    <MenuItem value={4} className="menu-item">
                        <p className="item-label font-maven">
                            Tên: Z - A
                        </p>
                    </MenuItem>
                </Select>
            </div>
            <div className='flex items-center gap-3'>
                <p className='font-semibold'>Hiển thị:</p>
                <Select
                    disableUnderline
                    value={viewType}
                    onChange={handleViewChange}
                    variant="standard"
                    className="bg-gray-200 rounded-[5px] px-2"
                >
                    <MenuItem value={1} className="menu-item">
                        <p className="item-label font-maven">
                            12
                        </p>
                    </MenuItem>
                    <MenuItem value={2} className="menu-item">
                        <p className="item-label font-maven">
                            20
                        </p>
                    </MenuItem>
                    <MenuItem value={3} className="menu-item">
                        <p className="item-label font-maven">
                            32
                        </p>
                    </MenuItem>
                </Select>
            </div>
        </div>
    )
}

export default SortComponent