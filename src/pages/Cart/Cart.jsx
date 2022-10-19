import { useEffect } from 'react'
import CartContainer from './CartContainer'

//** Third party components*/
import { Navigate } from 'react-router-dom'

const Cart = ({ title }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

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