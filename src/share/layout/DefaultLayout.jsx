import { Navigation, Footer } from '../components'

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Navigation />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayout