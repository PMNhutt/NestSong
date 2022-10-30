import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { deleteProductDetail } from '../../../redux/actionSlice/productSlice'

// ** Third party components
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";

const Login = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title])

    //** States, const */
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
                <LoginForm />
            )
        } else {
            if (decoded_jwt.Role === 'Staff' || decoded_jwt.Role === 'Admin') {
                return <Navigate replace to="/management" />
            } else {
                return <Navigate replace to="/" />
            }
        }
    } else {
        return (
            <LoginForm />
        )
    }
}

export default Login