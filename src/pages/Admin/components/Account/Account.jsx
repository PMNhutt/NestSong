import { useEffect, useState } from 'react'
import instances from '../../../../utils/plugin/axios'
import CreateModal from './components/Modal/CreateModal'
import UpdateModal from './components/Modal/UpdateModal'

import DataTable from './components/DataTable/DataTable'

//** Third party components*/
import { useSelector } from 'react-redux'

const Account = () => {
    //** States */
    const updateList = useSelector((state) => state.management.updateStaffList)
    const [accountList, setAccountList] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [updateData, setUpdateData] = useState()
    const [listAgency, setListAgency] = useState()
    const [createInfo, setCreateInfo] = useState({
        name: {
            value: '',
            error: false
        },
        agencyId: {
            value: '',
            error: false,
        },
        email: {
            value: '',
            error: false,
        },
        password: {
            value: '',
            error: false,
        },
    })

    //** call api */
    //** get staff list */
    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get('/admin/staffs', {
                params: {
                    roleid: '00000000-0000-0000-0000-000000000002'
                }
            })
            setAccountList(res?.data?.result)
        }
        fetch()
    }, [updateList])


    //** get agencies list */
    useEffect(() => {
        const fetch = async () => {
            const res = await instances.get('/agencies')
            setListAgency(res?.data?.result)
        }
        fetch()
    }, [])

    //** handle change create info */
    const handleAgencyChange = (value) => {
        setCreateInfo(curr => ({
            ...curr,
            agencyId: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputName = (value) => {
        setCreateInfo(curr => ({
            ...curr,
            name: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputEmail = (value) => {
        setCreateInfo(curr => ({
            ...curr,
            email: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputPassword = (value) => {
        setCreateInfo(curr => ({
            ...curr,
            password: {
                value: value,
                error: value ? false : true
            }
        }))
    }

    // ** handle open edit modal **
    const handleOpenEdit = (data) => {
        setShowEditModal(true)
        setUpdateData(data)
    }

    return (
        <div>
            {
                showCreateModal &&
                <CreateModal
                    listAgency={listAgency}
                    createInfo={createInfo}
                    setCreateInfo={setCreateInfo}
                    setShowCreateModal={setShowCreateModal}
                    handleAgencyChange={handleAgencyChange}
                    handleInputName={handleInputName}
                    handleInputEmail={handleInputEmail}
                    handleInputPassword={handleInputPassword}
                />
            }
            {
                showEditModal &&
                <UpdateModal
                    listAgency={listAgency}
                    setShowEditModal={setShowEditModal}
                    data={updateData}
                />
            }
            <div className='flex w-full justify-end'>
                <div
                    onClick={() => setShowCreateModal(true)}
                    className='rounded-[5px] cursor-pointer py-2 px-4 bg-primary text-white'>Thêm mới nhân viên</div>
            </div>
            <div className='mt-6'>
                <DataTable
                    handleOpenEdit={handleOpenEdit}
                    dashboardStaff={accountList} />
            </div>
        </div>
    )
}

export default Account