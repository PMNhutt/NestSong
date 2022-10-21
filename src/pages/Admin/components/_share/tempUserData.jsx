export const userColumns = [
    { field: 'productId', headerName: 'ID', width: 90 },
    // {
    //     field: 'user',
    //     headerName: 'Avatar',
    //     width: 90,
    //     renderCell: (params) => (
    //         <div className="cellWithImg">
    //             <img className="cellImg" alt="avatar" src={params.row?.img} />
    //         </div>
    //     ),
    // },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 210, flex: 1 },
    { field: 'categoryName', headerName: 'Danh mục', width: 210, flex: 1 },
    { field: 'salePrice', headerName: 'Giá bán (vnd)', width: 200, flex: 1},
    { field: 'originalPrice', headerName: 'Giá gốc (vnd)', width: 200, flex: 1},
    { field: 'discount', headerName: 'Giảm giá (%)', width: 160, flex: 1 },
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