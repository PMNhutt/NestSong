import { useEffect, useState } from 'react'

import ListContainer from './ListContainer'

// ** Third party components
import { Navigate } from 'react-router-dom'


const ProductList = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    // ** Const */
    const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

    if (loggedInUser) {
        if (Object.keys(loggedInUser).length === 0
            && loggedInUser.constructor === Object) {
            return (
                <ListContainer />
            )
        } else {
            if (loggedInUser.authorizeRole === 'Staff' || loggedInUser.authorizeRole === 'Admin') {
                return <Navigate replace to="/management" />
            } else {
                return (
                    <ListContainer />
                )
            }
        }
    } else {
        return (
            <ListContainer />
        )
    }
}

export default ProductList