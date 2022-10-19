import { useEffect } from 'react'
import { Hero, Trending, Policies, Clients, Introduce } from './components'

//** Third party components*/
import { Link, useNavigate, Navigate } from 'react-router-dom'

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title])

  //** Const  */
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

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