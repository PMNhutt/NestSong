import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import LoadingSmall from '../../../../../share/components/LoadingSmall/LoadingSmall';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const userColumns = [
    { field: 'orderId', headerName: 'ID', width: 90 },
    { field: 'customerName', headerName: 'Khách hàng', width: 210, flex: 1 },
    { field: 'customerAddress', headerName: 'Địa chỉ', width: 210, flex: 1 },
    { field: 'note', headerName: 'Ghi chú', width: 200, flex: 1 },
    { field: 'totalPrice', headerName: 'Tổng tiền (vnd)', width: 160, flex: 1 },
    { field: 'orderDate', headerName: 'Ngày đặt hàng', width: 160, flex: 1 },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 100,
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

const NoRowData = () => {
    return <p>No Data</p>
}

const DataTable = (props) => {

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Hành động',
            width: 100,
            renderCell: (params) => (
                <div className="cellAction">
                    <Tooltip title="Xem chi tiết" placement="right">
                        {/* <Link to={`/admin/edit-user/${params.row.id}`}> */}
                        <IconButton aria-label="edit">
                            <RemoveRedEyeIcon />
                        </IconButton>
                        {/* </Link> */}
                    </Tooltip>
                </div>
            ),
        },
    ];


    return (
        <div className="h-[70vh] bg-white">
            {
                // props?.orderList ?
                <DataGrid
                    rows={props?.orderList}
                    columns={userColumns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    loading={!props?.orderList.length}
                    components={{
                        LoadingOverlay: LoadingSmall,
                    }}
                    // getRowId={(row) => row.productId}
                    className="datagrid"
                    sx={{
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 700
                        }
                    }}
                />
                //  : <LoadingSmall />
            }
        </div>
    )
}

export default DataTable