import React,{useEffect} from 'react'
import ytLogo from './assets/images/yt-logo-mobile.png'
import { useNavigate } from 'react-router-dom'
import {authenticate} from './utils/authenticate'
import { useSelector } from 'react-redux'

const LandingPage = () => {

  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);

  useEffect(() => {
    if(!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('user/login')
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [!isAuthenticated]);

  return (
    <div className='flex items-center justify-center h-screen bg-black'>
        <img src={ytLogo} alt="YouTube Logo" className='h-14'/>
    </div>
    
  )
}

export default LandingPage