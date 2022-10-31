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
        firstName: {
            value: '',
            error: false
        },
        lastName: {
            value: '',
            error: false
        },
        phoneNumber: {
            value: '',
            error: false
        },
        address: {
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
    const handleInputFirstName = (value) => {
        setCreateInfo(curr => ({
            ...curr,
            firstName: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputLastName = (value) => {
        setCreateInfo(curr => ({
            ...curr,
            lastName: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputAddress = (value) => {
        setCreateInfo(curr => ({
            ...curr,
            address: {
                value: value,
                error: value ? false : true
            }
        }))
    }
    const handleInputPhoneNumber = (value) => {
        setCreateInfo(curr => ({
            ...curr,
            phoneNumber: {
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
                    handleInputFirstName={handleInputFirstName}
                    handleInputLastName={handleInputLastName}
                    handleInputEmail={handleInputEmail}
                    handleInputPassword={handleInputPassword}
                    handleInputAddress={handleInputAddress}
                    handleInputPhoneNumber={handleInputPhoneNumber}
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