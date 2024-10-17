import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import {toggleLoading} from '../../features/hooks/hookSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UpdateAvatar = () => {
  const loading = useSelector(state => state.hookReducer.loading)
  const [avatar, setAvatar] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useSelector(state => state.userReducer.user._id)
 
  const handleChange = (event) => {
      const {name, files} = event.target;

      const file = files[0]

      if(!file || !file.type.startsWith('image/')) {
        return handleError('Please select a valid image file.')
      }

      setAvatar(file)
  }
  const handleSubmit = async(event) => {
      event.preventDefault();
      dispatch(toggleLoading());
      
      const formData = new FormData()
      formData.append('avatar', avatar)
      try {
        const response = await axios.patch(`/api/v1/users/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // console.log('update avatar', response)
        setAvatar('')
        navigate(`/app/user/${id}`)
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
                    Update Avatar
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label 
                        htmlFor="avatar" 
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                        >
                            Avatar
                        </label>
                        <input 
                        type="file" 
                        name="avatar" 
                        id="avatar" 
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required={true}
                        />
                    </div>
     
                    <button type="submit" className="w-full bg-amber-600 text-white hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    {loading ? "Updating..." : "Update Avatar"}
                    </button>
                </form>
            </div>
        </div>
    </div>
    <ToastContainer />
    </section>
  )
}

export default UpdateAvatar