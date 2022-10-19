import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'

// ** Third party components
import { Navigate } from 'react-router-dom'

const Login = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title])

    //** States, const */
    const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

    if (loggedInUser) {
        if (Object.keys(loggedInUser).length === 0
            && loggedInUser.constructor === Object) {
            return (
                <LoginForm />
            )
        } else {
            if (loggedInUser.authorizeRole === 'Staff' || loggedInUser.authorizeRole === 'Admin') {
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