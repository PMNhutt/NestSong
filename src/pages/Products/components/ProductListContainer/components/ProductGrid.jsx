import { useState } from 'react'
import { Product } from '../../../../../share/components'

//** Third party components*/
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

const data = [
    { id: 1, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 20, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
    { id: 2, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 22, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
    { id: 3, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 23, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
    { id: 4, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 25, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
    { id: 5, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 26, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
    { id: 6, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 23, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
    { id: 7, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 27, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
    { id: 8, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 25, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
    { id: 9, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 23, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
    { id: 10, name: 'Yến Sào đặt biệt loại thượng hạng', sold: 60, price: 3650214, off_price: 3120541, discount: 20, star_value: 5 },
]

const ProductGrid = (props) => {

    //** States */
    const [page, setPage] = useState(1)

    const handlePaginationChange = (e) => {
        console.log(e.target.textContent);
    }

    // const handlePageNum = () => {
    //     if (data?.length > 0) {

    //     }
    // }

    return (
        <div className='font-maven'>
            {data?.length > 0 ?
                <Grid container spacing={3} className="product-grid-container">
                    {data?.length > 0 && data?.map((product, index) => (
                        <Grid
                            lg={3}
                            md={4}
                            sm={6}
                            xs={12}
                            item key={product.id}
                            className="product-grid-item"
                        >
                            <Product
                                data={product}
                            />
                        </Grid>
                    ))}
                </Grid> : <p className='text-center mt-5 font-semibold'>Chưa có sản phẩm nào!</p>}
            {data?.length > 0 ? <Pagination
                // className={classes.root}
                count={page}
                color="primary"
                onChange={handlePaginationChange}
                hideNextButton={true}
                hidePrevButton={true}
                className='my-10 flex justify-center'
            /> : <></>}

        </div>
    )
}

export default ProductGrid