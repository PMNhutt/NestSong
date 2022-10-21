import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import LoadingSmall from '../../../../../../share/components/LoadingSmall/LoadingSmall';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

//** Collumns */
export const userColumns = [
    { field: 'productId', headerName: 'ID', width: 90 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 210, flex: 1 },
    { field: 'categoryName', headerName: 'Danh mục', width: 210, flex: 1 },
    { field: 'salePrice', headerName: 'Giá bán (vnd)', width: 200, flex: 1 },
    { field: 'originalPrice', headerName: 'Giá gốc (vnd)', width: 200, flex: 1 },
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

const DataTable = (props) => {
    const actionColumn = [
        {
            field: 'action',
            headerName: 'Hành động',
            width: 100,
            renderCell: (params) => (
                <div className="cellAction">
                    <Tooltip title="Thêm" placement="right">
                        <IconButton aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

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