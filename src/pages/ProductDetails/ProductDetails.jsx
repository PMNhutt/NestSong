import DetailContainer from './DetailContainer'

//** Third party library*/
import { Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const ProductDetails = () => {

    //** const & states */
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
                <DetailContainer />
            )
        } else {
            if (decoded_jwt.Role === 'Staff' || decoded_jwt.Role === 'Admin') {
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