import React from 'react'
import { Helmet } from 'react-helmet'
import LoginComponents from '../components/pages/login/LoginComponents'

function Login() {
    return (
        <>
            <Helmet>
                <title>Natinal Builders - Admin</title>
                <meta
                    name="description"
                    content="naational builders admin dashboard"
                ></meta>
            </Helmet>
            <LoginComponents />
        </>
    )
}

export default Login