import React, {useEffect} from 'react'

const Register = ({ title}) => {
    useEffect(() => {
        document.title = title;
    }, [title])

    return (
        <div>Register</div>
    )
}

export default Register