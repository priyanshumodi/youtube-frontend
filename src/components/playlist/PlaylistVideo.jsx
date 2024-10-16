import React,{useState, useEffect} from 'react'
import { abbreviateNumber } from 'js-abbreviation-number'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

import VideoLength from '../shared/VideoLength'
import TimeAgo from '../shared/TimeAgo'
import { fetchDataFromApi } from '../utils/api'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../features/hooks/hookSlice'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios'

const PlaylistVideo = ({id, playlist}) => {
    const [video, setVideo] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        // console.log(id)
        fetchVideoById()
    }, [])

    const fetchVideoById = async() => {
        dispatch(toggleLoading())
        const result = await fetchDataFromApi(`videos/${id}`);
        // console.log("video", result?.[0])
        setVideo(result?.[0])
        dispatch(toggleLoading())
    }
    const handleDeleteVideo = async () => {
        try {
            dispatch(toggleLoading());
            const response = await axios.patch(`https://youtube-backend-rw43.onrender.com/api/v1/playlist/remove/${id}/${playlist}`)
            console.log(response)
            navigate(`/app/playlist/${playlist}`)
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(toggleLoading());
        }
    }
  return (
    <div className='flex'>
        <Link to={`/app/video/${id}`} className='flex justify-between'>
            <div className="flex mb-3">
                    <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
                        <img
                            className="h-full w-full object-cover"
                            src={video?.thumbnail}
                        />
                        {video?.duration && (
                            <VideoLength time={video?.duration} />
                        )}
                    </div>
                    <div className="flex flex-col ml-3 overflow-hidden">
                        <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
                            {video?.title}
                        </span>
                        <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                            {video?.owner?.fullName}
                            {true && (
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
                            )}
                        </span>
                        <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                            <span>{`${abbreviateNumber(
                                video?.views,
                                2
                            )} views`}</span>
                            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                                .
                            </span>
                            <span className="truncate">
                                <TimeAgo timestamp={video?.createdAt}/>
                            </span>
                        </div>
                    </div>
            </div>
        </Link>
        <div>
        <button onClick={handleDeleteVideo} className='hover:bg-white/[0.20]  h-8 w-8 p-2  rounded-full text-white'>
            <MdDelete />
        </button>
        </div>
    </div>
  )
}

export default PlaylistVideo