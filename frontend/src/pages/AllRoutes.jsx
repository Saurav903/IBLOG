import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import SignIn from './SignIn'
import Login from './Login'
import Blog from './Blog'
import Profile from './Profile'
import PrivateRoute from '../components/PrivateRoute'

const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<SignIn/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/blog' element={<PrivateRoute><Blog/></PrivateRoute>}/>
            <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
    </>
  )
}

export default AllRoutes