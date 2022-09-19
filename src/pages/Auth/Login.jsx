import React, { useEffect } from 'react'

const Login = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title])
    return (
        <div>Login</div>
    )
}

export default Login