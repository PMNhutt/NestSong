import { useEffect } from 'react'
import { Hero, Trending, Policies, Clients, Introduce } from './components'
import { deleteProductDetail } from '../../redux/actionSlice/productSlice'

//** Third party components*/
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title])

  //** Const  */
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
  const accessToken = localStorage.getItem('accessToken')
  let decoded_jwt = {}
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken)
  }

  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0
      && decoded_jwt.constructor === Object) {
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
      if (decoded_jwt.Role === 'Staff' || decoded_jwt.Role === 'Admin') {
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