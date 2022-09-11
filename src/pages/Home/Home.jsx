import { useEffect } from 'react'
import { Hero, Trending, Policies, Clients } from './components'
import { Navigation, Footer } from '../../share/components'
import styles from '../../share/style'

const Home = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title])

  return (
    <div >
      <Navigation />
      <Hero />
      <Policies />
      <Trending />
      <Clients />
      <Footer />
    </div>
  )
}

export default Home