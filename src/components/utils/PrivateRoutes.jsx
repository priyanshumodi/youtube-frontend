import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoutes = ({children}) => {
  const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
  let message = ""
  if(!isAuthenticated)
    message = "unAuthorized login first" 
  return isAuthenticated ? children : <Navigate to="/user/login" />
}

export default PrivateRoutes