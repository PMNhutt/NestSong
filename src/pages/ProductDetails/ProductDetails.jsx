import DetailContainer from './DetailContainer'

//** Third party library*/
import { Navigate } from 'react-router-dom'

const ProductDetails = () => {

    //** const & states */
    const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

    if (loggedInUser) {
        if (Object.keys(loggedInUser).length === 0
            && loggedInUser.constructor === Object) {
            return (
                <DetailContainer />
            )
        } else {
            if (loggedInUser.authorizeRole === 'Staff' || loggedInUser.authorizeRole === 'Admin') {
                return <Navigate replace to="/management" />
            } else {
                return (
                    <DetailContainer />
                )
            }
        }
    } else {
        return (
            <DetailContainer />
        )
    }
}

export default ProductDetails