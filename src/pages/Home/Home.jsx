import { useEffect } from 'react'
import { Hero, Trending, Policies, Clients, Introduce } from './components'

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title])

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

export default Home