import { useEffect } from 'react'
import { Navigation, Footer } from '../../share/components'
import styles from '../../share/style'

const About = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title])

  return (
    <div >
      <Navigation />
      <p className="text-black font-maven">About Nest Song</p>
      <Footer />
    </div>
  )
}

export default About