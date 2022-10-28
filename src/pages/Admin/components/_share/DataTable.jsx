import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { userColumns } from './tempUserData';
import { Link } from 'react-router-dom'
import LoadingSmall from '../../../../share/components/LoadingSmall/LoadingSmall'

function Datatable(props) {

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Hành động',
            width: 100,
            renderCell: (params) => (
                <div className="cellAction">
                    <Tooltip title="Chỉnh sửa" placement="left">
                        {/* <Link to={`/admin/edit-user/${params.row.id}`}> */}
                        <IconButton
                            onClick={() => props?.handleOpenEditModal(params.row.productId, params.row.categoryId)}
                            aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        {/* </Link> */}
                    </Tooltip>
                    <Tooltip title="Ẩn SP" placement="right">
                        <IconButton
                            onClick={() => props?.handleOpenDeleteModal(params.row)}
                            aria-label="remove">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];
    return (
        <div className="h-[75vh] bg-white">
            {
                // props?.dashboardProList ?
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
                //  : <LoadingSmall />
            }
        </div>
    );
}

export default Datatable;