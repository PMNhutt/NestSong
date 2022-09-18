import { useEffect } from 'react'
import styles from '../../share/style'

const About = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title])

  return (
    <div >
      <p className="text-black font-maven">About Nest Song</p>
    </div>
  )
}

export default About