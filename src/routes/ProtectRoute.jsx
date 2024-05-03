import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

function ProtectRoute() {
    const token = localStorage.getItem('token')
    if (token){
        return <Outlet/>
    } else {
      return <Navigate to={'/auth'} />;
    }
}

export default ProtectRoute