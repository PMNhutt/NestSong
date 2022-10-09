import { useState, useEffect } from 'react'
import { Product } from '../../../../../share/components'
import LoadingSmall from '../../../../../share/components/LoadingSmall/LoadingSmall'

//** Third party components*/
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';

//fake data
const data = [
    { productId: 2, productName: 'Yến Sào đặt biệt loại thượng hạng 2', stock: 10, soldQuantity: 22, price: 500000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 1, productName: 'Yến Sào đặt biệt loại thượng hạng 1', stock: 10, soldQuantity: 20, price: 525000, off_price: 3120541, discount: 0.2, rating: 4 },
    { productId: 3, productName: 'Yến Sào đặt biệt loại thượng hạng 3', stock: 10, soldQuantity: 23, price: 500000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 4, productName: 'Yến Sào đặt biệt loại thượng hạng 4', stock: 10, soldQuantity: 25, price: 450000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 5, productName: 'Yến Sào đặt biệt loại thượng hạng 5', stock: 10, soldQuantity: 26, price: 500000, off_price: 3120541, discount: 0.2, rating: 3.5 },
    { productId: 6, productName: 'Yến Sào đặt biệt loại thượng hạng 6', stock: 10, soldQuantity: 23, price: 245000, off_price: 3120541, discount: 0.2, rating: 4 },
    { productId: 7, productName: 'Yến Sào đặt biệt loại thượng hạng 7', stock: 10, soldQuantity: 27, price: 500000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 8, productName: 'Yến Sào đặt biệt loại thượng hạng 8', stock: 10, soldQuantity: 25, price: 350000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 9, productName: 'Yến Sào đặt biệt loại thượng hạng 9', stock: 10, soldQuantity: 23, price: 500000, off_price: 3120541, discount: 0.2, rating: 5 },
    { productId: 10, productName: 'Yến Sào đặt biệt loại thượng hạng 10', stock: 10, soldQuantity: 60, price: 225000, off_price: 3120541, discount: 0.2, rating: 5 },

]

const ProductGrid = (props) => {

    //** States */
    const [page, setPage] = useState(1)
    const productList = useSelector((state) => state.product?.productList)

    useEffect(() => {
        // console.log(productList)

    }, [productList])

    const handlePaginationChange = (e) => {
        // console.log(e.target.textContent);
        props?.setPage(e.target.textContent)
    }

    return (
        <div className='font-maven'>
            {productList ? <>
                {productList?.result?.length > 0 ?
                    <Grid container spacing={3} className="product-grid-container">
                        {productList?.result.length > 0 && productList?.result.map((product, index) => (
                            <Grid
                                lg={3}
                                md={4}
                                sm={6}
                                xs={12}
                                item key={product.productId}
                                className="product-grid-item"
                            >
                                <Product
                                    data={product}
                                />
                            </Grid>
                        ))}
                    </Grid> : <p className='text-center mt-5 font-semibold'>Không tìm thấy sản phẩm!</p>}
                {productList?.result?.length > 0 ? <Pagination
                    // className={classes.root}
                    count={productList?.total_pages}
                    color="primary"
                    onChange={handlePaginationChange}
                    hideNextButton={true}
                    hidePrevButton={true}
                    className='my-10 flex justify-center'
                /> : <></>}
            </> : <LoadingSmall />}
        </div>
    )
}

export default ProductGrid