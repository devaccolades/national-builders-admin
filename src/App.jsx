import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollTop from './components/utils/ScrollTop'
import PrivateRoute from './routes/PrivateRoute'
import ProtectRoute from './routes/ProtectRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import Enquiry from './pages/Enquiry'

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        {/* <Route element={<PrivateRoute />}> */}
        <Route path='/auth/' element={<Login />} />
        {/* </Route> */}
        {/* <Route element={<ProtectRoute />}> */}
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/enquiry' element={<Enquiry />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App