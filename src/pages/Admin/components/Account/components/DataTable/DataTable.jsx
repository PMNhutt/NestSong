import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LoadingSmall from '../../../../../../share/components/LoadingSmall/LoadingSmall'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

//** Collumns */
export const userColumns = [
    { field: 'accountId', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Tên nhân viên', width: 210, flex: 1 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', width: 210, flex: 1 },
    { field: 'email', headerName: 'Email', width: 200, flex: 1 },
    { field: 'address', headerName: 'Chi nhánh', width: 200, flex: 1 },
    {
        field: 'status',
        headerName: 'Trạng thái',
        // width: 100,
        flex: 1,
        renderCell: (params) => (
            <div className={`cellWithStatus ${params.row.status}`}>
                {
                    params.row.status === 'VALID' ?
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
                    <Tooltip title="Chỉnh sửa" placement="right">
                        <IconButton
                            onClick={() => props?.handleOpenEdit(params.row)}
                            aria-label="add">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="h-[75vh] bg-white">
            {
                <DataGrid
                    rows={props?.dashboardStaff}
                    columns={userColumns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.accountId}
                    loading={!props?.dashboardStaff.length}
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