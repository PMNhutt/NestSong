import { useEffect, useState } from 'react'
import {deleteProductDetail} from '../../redux/actionSlice/productSlice'

import ListContainer from './ListContainer'

// ** Third party components
import { Navigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import jwt_decode from "jwt-decode";

const ProductList = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [title])

    // ** Const */
    const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
    const accessToken = localStorage.getItem('accessToken')
    let decoded_jwt = {}
    if (accessToken) {
        decoded_jwt = jwt_decode(accessToken)
    }
    const dispatch = useDispatch()

    //** remove productDetail localStorage */
    useEffect(() => {
        dispatch(deleteProductDetail())
    }, [])

    if (accessToken) {
        if (Object.keys(decoded_jwt).length === 0
            && decoded_jwt.constructor === Object) {
            return (
                <ListContainer />
            )
        } else {
            if (decoded_jwt.Role === 'Staff' || loggedInUser.Role === 'Admin') {
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