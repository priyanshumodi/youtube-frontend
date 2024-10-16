import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Healthcheck = () => {
  const [msg, setMsg] = useState('')
  const response = async () => {
    const data = await axios.post('/api/v1/users');
    // console.log(data.data)
    setMsg(data.data)
  }
  const user = useSelector(state => state.userReducer.user)
  const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
  console.log(user, isAuthenticated)
  
  response()
  return (
    <div>Healthcheck: {msg}</div>
  )
}

export default Healthcheck