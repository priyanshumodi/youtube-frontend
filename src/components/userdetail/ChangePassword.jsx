import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import {toggleLoading} from '../../features/hooks/hookSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { handleError } from '../utils/ResponseMessage'

const ChangePassword = () => {
    const loading = useSelector(state => state.hookReducer.loading)
    const user = useSelector(state => state.userReducer.user)

  const [detail, setDetail] = useState({
    password: '',
    newPassword: '',
    rePassword: ''
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (event) => {
    const {name, value} = event.target;
    console.log(name, " ", value)
    setDetail({...detail, [name]:value})
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(detail?.rePassword !== detail?.newPassword) 
        return handleError("New password should same");
    if(detail?.password?.trim() === '')
        return handleError("password should not empty");
    if(detail?.newPassword?.trim() === '')
        return handleError("new password should not empty");
    
    try {
        dispatch(toggleLoading());
      const response = await axios.post(`https://youtube-backend-rw43.onrender.com/api/v1/users/change-password`, detail)
    //   console.log('update password', response)
      setDetail({
        password: '',
        newPassword: '',
        rePassword: ''
      })
      navigate(`/app/user/${user?._id}`)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(toggleLoading());
    }
  }
  return (
    <section className="bg-gray-50 h-auto">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 md:h-auto sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Change Password
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label 
                        htmlFor="password" 
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                        >
                            password
                        </label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        onChange={handleChange}
                        value={detail?.password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required={true}
                        placeholder="***********" 
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="newPassword" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            New Password
                        </label>
                        <input 
                        type="password" 
                        name="newPassword" 
                        id="newPassword" 
                        onChange={handleChange}
                        value={detail?.newPassword}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="***********" 
                        required={true}
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="re-newPassword" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Re-Enter New Password
                        </label>
                        <input 
                        type="password" 
                        name="rePassword" 
                        id="rePassword" 
                        onChange={handleChange}
                        value={detail?.rePassword}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="***********" 
                        required={true}
                        />
                    </div>
     
                    <button type="submit" className="w-full bg-amber-600 text-white hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    {loading ? "Updating..." : "Update password"}
                    </button>
                </form>
            </div>
        </div>
    </div>
    <ToastContainer />
    </section>
  )
}

export default ChangePassword