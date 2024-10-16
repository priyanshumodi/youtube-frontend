import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import {toggleLoading} from '../../features/hooks/hookSlice'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { handleError } from '../utils/ResponseMessage'
import { fetchDataFromApi } from '../utils/api'

const UpdatePlaylist = () => {
    const {id} = useParams()
    const loading = useSelector(state => state.hookReducer.loading)
    const user = useSelector(state => state.userReducer.user)
    const [playlist, setPlaylist] = useState({});

    const [detail, setDetail] = useState({
        name: '',
        description: ''
    })

    useEffect(() => {
        fetchPlaylistVideo()
    }, [])
    
    const fetchPlaylistVideo = async() => {
        dispatch(toggleLoading())
        const result = await fetchDataFromApi(`playlist/${id}`);
        console.log(result)
        setPlaylist(result)
        setDetail({
            name: result?.name,
            description: result?.description
        })
        dispatch(toggleLoading())
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const {name, value} = event.target;

        setDetail({...detail, [name]:value})
    }

    const handleSubmit = async(event) => {
    event.preventDefault();
    if(detail?.description === playlist?.description && detail?.name === playlist?.name) 
        return handleError("Update wants changes in data");
    
    try {
        dispatch(toggleLoading());
        const response = await axios.patch(`https://youtube-backend-rw43.onrender.com/api/v1/playlist/${id}`, detail)
     
        setDetail({
          name: '',
          description: ''
        })
        navigate(`/app/playlist/${id}`)
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
                    Update Playlist
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label 
                        htmlFor="name" 
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                        >
                            Name
                        </label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        onChange={handleChange}
                        value={detail?.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required={true}
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="description" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <input 
                        type="text" 
                        name="description" 
                        id="description" 
                        onChange={handleChange}
                        value={detail?.description}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="name@company.com" 
                        required={true}
                        />
                    </div>
     
                    <button type="submit" className="w-full bg-amber-600 text-white hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    {loading ? "Updating..." : "Update playlist"}
                    </button>
                </form>
            </div>
        </div>
    </div>
    <ToastContainer />
    </section>
  )
}

export default UpdatePlaylist