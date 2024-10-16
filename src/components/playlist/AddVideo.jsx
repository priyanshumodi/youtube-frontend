import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLoading } from '../../features/hooks/hookSlice'
import { fetchDataFromApi } from '../utils/api'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { handleError } from '../utils/ResponseMessage'

const AddVideo = () => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userReducer.user._id)
    const {videoId} = useParams()
    const [playlist, setPlaylist] = useState([])

    useEffect(() => {
        fetchUserPlaylist()
    }, [])

    const fetchUserPlaylist = async() => {
        try {
            dispatch(toggleLoading())
            const response = await fetchDataFromApi(`playlist/user/${userId}`)
            setPlaylist(response)
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(toggleLoading())
        }
    }

    const handleCheckboxChange = async (playlistId) => {
        try {
            dispatch(toggleLoading())
            const response = await axios.patch(`/api/v1/playlist/add/${videoId}/${playlistId}`)
            console.log(response)
            window.history.back()
        } catch (error) {
            return handleError(error)
        } finally {
            dispatch(toggleLoading())
        }
        
    }

    const handleCross = () => {
        window.history.back()
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="bg-card rounded-lg p-6 w-80 shadow-lg shadow-zinc-600 bg-gray-600">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">Save video to...</h2>
                <button onClick={handleCross} className="text-muted-foreground hover:text-muted">✖</button>
            </div>
            {playlist.map(item => (
                <div key={item?._id} className="flex items-center mb-2">
                <input onChange={() => handleCheckboxChange(item?._id)} type="checkbox" id="jethalaal" className="mr-2 cursor-pointer" />
                <label htmlFor="jethalaal" className="text-foreground text-white">{item?.name}</label>
                <span className="ml-auto text-muted-foreground">🌐</span>
                </div>
            ))
            }
            <Link to={`/app/playlist-create`} className="mt-4 pl-14 w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded text-white hover:text-slate-400">Create a new playlist</Link>
        </div>
        <ToastContainer />
    </div>
  )
}

export default AddVideo