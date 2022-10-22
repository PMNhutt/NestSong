import { useEffect, useState } from 'react'
import Modal from './components/Modal'
import instances from '../../../../utils/plugin/axios'
import { setAdminProductList, setAdminStaffList } from '../../../../redux/actionSlice/managementSlice'

// ** images
import { dashboardProduct, dashboardUser, dashboardOrder, dashboardCash } from '../../../../assets/images'

//** third party libraries*/
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  //** States */
  const dispatch = useDispatch()
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalStaff, setTotalStaff] = useState(0)

  //** get total result */
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/admin/products')
      const total_products = res?.data?.total_results
      setTotalProducts(total_products)
      dispatch(setAdminProductList(res?.data?.result))
    }

    fetch()
  }, [])
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/admin/staffs', {
        params: {
          roleid: '00000000-0000-0000-0000-000000000002'
        }
      })
      setTotalStaff(res?.data?.total_results)
      dispatch(setAdminStaffList(res?.data?.result))
    }
    fetch()
  }, [])


  return (
    <div className='text-black'>
      <div className='flex gap-3'>
        <Modal
          picture={dashboardProduct}
          name='Tổng sản phẩm'
          value={totalProducts}
        />
        <Modal
          picture={dashboardUser}
          name='Nhân viên'
          value={totalStaff}
        />
        <Modal
          picture={dashboardCash}
          name='Doanh thu'
          value={10}
        />
      </div>
    </div>
  )
}

export default Dashboard