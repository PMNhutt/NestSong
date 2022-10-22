import { useEffect, useState } from 'react'
import instances from '../../../../utils/plugin/axios'

import DataTable from './components/DataTable/DataTable'

//** Third party components*/
import { useSelector } from 'react-redux'

const Account = () => {
    //** States */
    const accountList = useSelector((state) => state?.management?.adminStaffList)

    //** call api */

    return (
        <div>
            <DataTable
                dashboardStaff={accountList} />
        </div>
    )
}

export default Account