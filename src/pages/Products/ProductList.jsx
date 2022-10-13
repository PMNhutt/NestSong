import { useEffect, useState } from 'react'
import { Banner } from '../../share/components'
import Filter from './components/Filter/Filter'
import ProductListContainer from './components/ProductListContainer/ProductListContainer'
import { setProductList } from '../../redux/actionSlice/productSlice'
import instances from '../../utils/plugin/axios'

// ** Hooks
import useDebounce from '../../share/hooks/useDebounce'

// ** Images
import { productListBanner } from '../../assets/images'

// ** Third party components
import { useDispatch } from 'react-redux'

// ** data
const data = {
    category: [
        { id: 1, name: 'Tổ yến thô', value: 'yen-tho' },
        { id: 2, name: 'Tổ yến tinh chế', value: 'yen-tinh-che' },
        { id: 3, name: 'Yến hũ chưng tươi', value: 'yen-hu-tuoi' },
        { id: 4, name: 'Yến hũ chưng sẵn', value: 'yen-hu-chung-san' },
    ]
}

const ProductList = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    // ** Const */
    const dispatch = useDispatch()
    const [searchVal, setSearchVal] = useState('')
    const debounced = useDebounce(searchVal, 600)

    const [page, setPage] = useState(1)
    const [size, setSize] = useState(null)
    const [cateid, setCateId] = useState(null)
    const [sort, setSort] = useState('asc')
    const [minPrice, setMinPrice] = useState(100000)
    const [maxPrice, setMaxPrice] = useState(10000000)
    const [categoryList, setCategoryList] = useState()

    // ** call search api
    useEffect(() => {
        // console.log('page', parseInt(page));
        if (debounced !== '') {
            if (!debounced.trim()) {
                return;
            }

            const fetch = async () => {
                const res = await instances.get('/products/search', {
                    params: {
                        name: debounced,
                        page: 1,
                        size: size,
                        sort: sort,
                        cateid: cateid,
                        min: minPrice,
                        max: maxPrice
                    }
                })
                setPage(1)
                dispatch(setProductList(res?.data))
            }
            fetch()
        } else {
            const fetch = async () => {
                const res = await instances.get('/products', {
                    params: {
                        page: page,
                        size: size,
                        sort: sort,
                        cateid: cateid,
                        min: minPrice,
                        max: maxPrice
                    }
                })
                if (res?.data?.result.length === 0 && (res?.data?.page > res?.data?.total_pages)) {
                    let pageValue = res?.data?.page - 1
                    const newRes = await instances.get('/products', {
                        params: {
                            page: pageValue,
                            size: size,
                            sort: sort,
                            cateid: cateid
                        }
                    })
                    setPage(pageValue)
                    dispatch(setProductList(newRes?.data))
                } else {
                    dispatch(setProductList(res?.data))
                }
            }

            fetch()
        }


    }, [debounced, page, sort, size, cateid, minPrice, maxPrice])

    //** get categories */
    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get('/categories')
            // console.log(res?.data);
            setCategoryList(res?.data)
        }

        fetch()
    }, [])

    return (
        <div>
            <Banner img={productListBanner} />
            <div className='flex md:flex-row flex-col gap-[5px]'>
                <div className='md:w-[23%] w-full'>
                    <Filter
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        setSearchVal={setSearchVal}
                        filter={data.category}
                    />
                </div>
                <div className='md:w-[77%] w-full'>
                    <ProductListContainer
                        page={parseInt(page)}
                        setPage={setPage}
                        setSize={setSize}
                        setCateId={setCateId}
                        setSort={setSort}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductList