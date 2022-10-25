import { useEffect } from 'react'
import CartContainer from './CartContainer'
import {deleteProductDetail} from '../../redux/actionSlice/productSlice'

//** Third party components*/
import { Navigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'

const Cart = ({ title }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
  const dispatch = useDispatch()

  //** remove productDetail */
  useEffect(() => {
    dispatch(deleteProductDetail())
  }, [])

  if (loggedInUser) {
    if (Object.keys(loggedInUser).length === 0
      && loggedInUser.constructor === Object) {
      return (
        <CartContainer />
      )
    } else {
      if (loggedInUser.authorizeRole === 'Staff' || loggedInUser.authorizeRole === 'Admin') {
        return <Navigate replace to="/management" />
      } else {
        return (
          <CartContainer />
        )
      }
    }
  } else {
    return (
      <CartContainer />
    )
  }
}

export default Cart