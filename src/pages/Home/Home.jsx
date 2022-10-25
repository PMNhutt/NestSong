import { useEffect } from 'react'
import { Hero, Trending, Policies, Clients, Introduce } from './components'
import { deleteProductDetail } from '../../redux/actionSlice/productSlice'

//** Third party components*/
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title])

  //** Const  */
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
  const dispatch = useDispatch()

  //** remove productDetail localStore */
  useEffect(() => {
    dispatch(deleteProductDetail())
  }, [])

  if (loggedInUser) {
    if (Object.keys(loggedInUser).length === 0
      && loggedInUser.constructor === Object) {
      return (
        <div >
          <Hero />
          <Trending />
          <Introduce />
          <Clients />
          <Policies />
        </div>
      )
    } else {
      if (loggedInUser.authorizeRole === 'Staff' || loggedInUser.authorizeRole === 'Admin') {
        return <Navigate replace to="/management" />
      } else {
        return (
          <div >
            <Hero />
            <Trending />
            <Introduce />
            <Clients />
            <Policies />
          </div>
        )
      }
    }
  } else {
    return (
      <div >
        <Hero />
        <Trending />
        <Introduce />
        <Clients />
        <Policies />
      </div>
    )
  }
}

export default Home