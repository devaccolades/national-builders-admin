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
const Home = lazy(() => import('./pages/Home'));
const Project = lazy(() => import('./pages/Project'));
const AddProject = lazy(() => import('./pages/AddProject'));
const Contact = lazy(() => import('./pages/Contact'));
const Amenities = lazy(() => import('./pages/Amenities'));
const EditProject = lazy(() => import('./pages/EditProject'));
const Rentals = lazy(() => import('./pages/Rentals'));
const KeyHandOver = lazy(() => import('./pages/KeyHandOver'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Blogs = lazy(() => import('./pages/Blogs'));
const NewAndEvents = lazy(() => import('./pages/NewAndEvents'));
const Seo = lazy(() => import('./pages/Seo'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Error = lazy(() => import('./pages/Error'));


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
              <Route path='/home' element={<Home />} />
              <Route path='/rentals' element={<Rentals />} />
              <Route path='/amenities' element={<Amenities />} />
              <Route path='/project' element={<Project />} />
              <Route path='/add-project' element={<AddProject />} />
              <Route path='/edit-project/:slug' element={<EditProject />} />
              <Route path='/key-handover' element={<KeyHandOver />} />
              <Route path='/testimonials' element={<Testimonials />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/news-and-events' element={<NewAndEvents />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/seo' element={<Seo />} />
              <Route path='/*' element={<PageNotFound />} />
          <Route path='/error' element={<Error />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>

    </BrowserRouter>
  )
}

export default App