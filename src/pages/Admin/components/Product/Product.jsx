import { useState, useEffect } from 'react'
import Datatable from '../_share/DataTable'
import CreateModal from './components/CreateModal'
import instances from '../../../../utils/plugin/axios'
import useDebounce from '../../../../share/hooks/useDebounce'
import { setProductList } from '../../../../redux/actionSlice/productSlice'

//** Third party components*/
import { Input } from '@mui/material'
import { useDispatch } from 'react-redux'

//fake data 
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

const Product = () => {
    //** Const */
    const [searchVal, setSearchVal] = useState('')
    // const [page, setPage] = useState(1)
    const dispatch = useDispatch()

    const debounced = useDebounce(searchVal, 600)
    const [isShowModal, setIsShowModal] = useState(false)
    const [provinces, setProvinces] = useState('')
    const [categoryList, setCategoryList] = useState('')
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    // const shoppingCart = useSelector((state) => state.cart?.shoppingCart)

    const [dashboardProList, setDashboardProList] = useState([])
    const [createInfo, setCreateInfo] = useState({
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
        // district: '',
        // ward: '',
    })

    //** get categories */
    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get('/categories')
            // console.log(res?.data);
            setCategoryList(res?.data?.result)
        }

        fetch()
    }, [])

    // ** call search api
    useEffect(() => {
        if (debounced !== '') {
            if (!debounced.trim()) {
                return;
            }

            const fetch = async () => {
                const res = await instances.get('/admin/products/search', {
                    params: {
                        name: debounced,
                    }
                })
                setDashboardProList(res?.data?.result)
            }
            fetch()
        } else {
            const fetch = async () => {
                const res = await instances.get('/admin/products')
                setDashboardProList(res?.data?.result)
            }
            fetch()
        }


    }, [debounced])

    //** get delivery information */
    const handleInputName = (value) => {
        setCreateInfo(currVal => ({
            ...currVal,
            name: {
                value: value,
                error: value ? false : true
            }
        }))
    }

    //**  */

    const handleInputPrice = (value) => {
        setCreateInfo(currVal => ({
            ...currVal,
            price: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputDiscount = (value) => {
        setCreateInfo(currVal => ({
            ...currVal,
            discount: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputNote = (value) => {
        setCreateInfo(currVal => ({
            ...currVal,
            note: value
        }))
    }
    const handleSelectCategory = (value) => {
        setCreateInfo(currVal => ({
            ...currVal,
            category: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleSelectAmount = (value) => {
        setCreateInfo(currVal => ({
            ...currVal,
            amount: {
                value: value,
                error: value ? false : true
            }
        }))
    }

    return (
        <div>
            {
                isShowModal &&
                <CreateModal
                    provinces={provincesData}
                    categoryList={categoryList}
                    isShowModal={isShowModal}
                    setIsShowModal={setIsShowModal}
                    setProvinces={setProvinces}
                    handleInputName={handleInputName}
                    handleSelectCategory={handleSelectCategory}
                    createInfo={createInfo}
                    setCreateInfo={setCreateInfo}
                    handleInputPrice={handleInputPrice}
                    handleInputDiscount={handleInputDiscount}
                    handleSelectAmount={handleSelectAmount}
                    handleInputNote={handleInputNote}
                />
            }

            <div className='flex items-center justify-between'>
                <Input placeholder='Tìm kiếm ở đây...' onChange={(e) => setSearchVal(e.target.value)}/>
                <div
                    onClick={() => setIsShowModal(true)}
                    className='rounded-[5px] cursor-pointer py-2 px-4 bg-primary text-white'>Thêm mới sản phẩm</div>
            </div>
            <div className='mt-6'>
                <Datatable dashboardProList={dashboardProList} />
            </div>


        </div>
    )
}

export default Product