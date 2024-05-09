import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollTop from './components/utils/ScrollTop'
import PrivateRoute from './routes/PrivateRoute'
import ProtectRoute from './routes/ProtectRoute'
import Layout from './pages/Layout'
import Loader from './components/common/Loader';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Enquiry = lazy(() => import('./pages/Enquiry'));
const Project = lazy(() => import('./pages/Project'));
const AddProject = lazy(() => import('./pages/AddProject'));
const Contact = lazy(() => import('./pages/Contact'));
const Amenities = lazy(() => import('./pages/Amenities'));
const EditProject = lazy(() => import('./pages/EditProject'));
const Rentals = lazy(() => import('./pages/Rentals'));
const KeyHandOver = lazy(() => import('./pages/KeyHandOver'));

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/auth/' element={<Login />} />
          </Route>
          <Route element={<ProtectRoute />}>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/enquiry' element={<Enquiry />} />
              <Route path='/rentals' element={<Rentals />} />
              <Route path='/amenities' element={<Amenities />} />
              <Route path='/project' element={<Project />} />
              <Route path='/add-project' element={<AddProject />} />
              <Route path='/edit-project/:slug' element={<EditProject />} />
              <Route path='/key-handover' element={<KeyHandOver />} />
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>

    </BrowserRouter>
  )
}

export default App