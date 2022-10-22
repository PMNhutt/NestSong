import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import LoadingSmall from '../../../../../../share/components/LoadingSmall/LoadingSmall';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { setAddedProduct, addItemToCart } from '../../../../../../redux/actionSlice/managementSlice'

//** Collumns */
export const userColumns = [
    { field: 'productId', headerName: 'ID', width: 90 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 210, flex: 1 },
    { field: 'categoryName', headerName: 'Danh mục', width: 210, flex: 1 },
    { field: 'salePrice', headerName: 'Giá bán (vnd)', width: 200, flex: 1 },
    { field: 'originalPrice', headerName: 'Giá gốc (vnd)', width: 200, flex: 1 },
    { field: 'discount', headerName: 'Giảm giá (%)', width: 160, flex: 1 },
    { field: 'quantityInStock', headerName: 'SL trong kho', flex: 1 },
    {
        field: 'status',
        headerName: 'Trạng thái',
        // width: 100,
        flex: 1,
        renderCell: (params) => (
            <div className={`cellWithStatus ${params.row.status}`}>
                {
                    params.row.status === 'AVAILABLE' ?
                        <p className='text-green-500'>
                            {params.row.status}
                        </p> : <p className='text-red-500'>
                            {params.row.status}
                        </p>
                }
            </div>
        ),
    },

];

const DataTable = (props) => {
    const [productId, setProductId] = useState()
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.management.cartList)
    const [inputValue, setInputValue] = useState(1)
    const notifyWarn = () => toast.warn("Bạn đã chọn tối đa !", {
        pauseOnHover: false,
    });
    const notifyWarnSoldOut = () => toast.warn("Sản phẩm này đã hết hàng !", {
        pauseOnHover: false,
    });
    const actionColumn = [
        {
            field: 'action',
            headerName: 'Hành động',
            width: 100,
            renderCell: (params) => (
                <div className="cellAction">
                    <Tooltip title="Thêm" placement="right">
                        <IconButton
                            onClick={() => handleAdd(params.row)}
                            aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    // ** handle add cart list **
    const handleAdd = (value) => {
        // console.log(value)
        if (value?.quantityInStock === 0) {
            notifyWarnSoldOut()
        } else {
            dispatch(addItemToCart({
                // product: product,
                id: value?.productId,
                name: value?.productName,
                price: value?.salePrice,
                stock: value?.quantityInStock,
                inputValue: inputValue,
                categoryName: value?.categoryName
            }))
            setProductId(value?.productId)

            // dispatch(getShoppingCart())
        }
    }

    useEffect(() => {
        let added;
        if (productId) {
            added = productList?.find((product) => {
                return product.id === productId
            })
        }
        if (added !== undefined) {
            dispatch(setAddedProduct({
                id: added.id,
                amountAdded: added.amount,
            }))
        } else {
            dispatch(setAddedProduct({
                id: 0,
                amountAdded: 0,
            }))
        }
    }, [productList, productId])

    return (
        <div className="h-[60vh] bg-white">
            {
                <DataGrid
                    rows={props?.dashboardProList}
                    columns={userColumns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.productId}
                    loading={!props?.dashboardProList.length}
                    components={{
                        LoadingOverlay: LoadingSmall,
                    }}
                    className="datagrid"
                    sx={{
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 700
                        }
                    }}
                />
            }
        </div>
    )
}

export default DataTable