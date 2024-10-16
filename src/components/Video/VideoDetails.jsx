import React,{ useState, useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { AiOutlineLike } from 'react-icons/ai'
import { AiFillLike } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { abbreviateNumber } from 'js-abbreviation-number'
import { MdOutlineSaveAlt } from "react-icons/md";

import {fetchDataFromApi} from "../utils/api"
import { useDispatch, useSelector } from 'react-redux'
import SuggestionVideoCard from "./SuggestionVideoCard"
import { toggleLoading } from '../../features/hooks/hookSlice'
import axios from 'axios'
import Comment from './Comment'


const VideoDetails = () => {

  const dispatch = useDispatch()

  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [like, setLike] = useState(0)
  const { id } = useParams();
  const [subscribe, setSubscribe] = useState(false)

  const [videoOwner,setVideoOwner] = useState({})
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    if(id) {
    fetchVideoDetails();
    fetchVideoLikes();
    }
  }, [id])

  useEffect(() => {
    // console.log(video?.owner)
    fetchVideoUser(video?.owner?._id)
}, [video])


  const fetchVideoLikes = async () => {
    const result = await fetchDataFromApi(`likes/video/${id}`)
    // console.log(result?.[0]?.totalLikes)
    if(result?.[0]?.totalLikes) {
    setLike(result?.[0]?.totalLikes)
    setLiked(result?.[0]?.isLiked)
    } else {
      setLike(0);
      setLike(false);
    }
  }

  const fetchVideoUser = async (owner) => {
      const result = await fetchDataFromApi(`subscriptions/u/${owner}`)
      console.log("video owner",result?.[0])
      setVideoOwner(result?.[0])
      if(result?.[0]?.isSubscribed) {
        setSubscribe(true)
      } else {
        setSubscribe(false)
      }
  }

  const fetchVideoDetails = () => {
    dispatch(toggleLoading())
    fetchDataFromApi(`videos/${id}`).then((res) => {
      console.log("get video detail",res);
      setVideo(res?.[0]);
      fetchRelatedVideos();
    })
    dispatch(toggleLoading())
  }

  const fetchRelatedVideos = async () => {
    dispatch(toggleLoading())
    const options = {
      params: {
        query: video?.title, // Search keyword
        page: 1,
        limit: 10,
      },
    }

    try {
      const response = await fetchDataFromApi(`videos`,options)
      console.log(response);
      setRelatedVideos(response?.videos);
      dispatch(toggleLoading())
    } catch (error) {
      dispatch(toggleLoading())
      console.log(error)
    }
  }

  const handleToggleLike = async () => {
    try {
      const result = await axios.post(`https://youtube-backend-rw43.onrender.com/api/v1/likes/toggle/v/${id}`)
      // console.log(result)
      if(result?.data?.data?.acknowledged) {
        setLike(like-1)
        setLiked(false)
      } else {
        setLike(like+1)
        setLiked(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggleSubscribe = async() => {
    const response = await axios.post(`https://youtube-backend-rw43.onrender.com/api/v1/subscriptions/c/${video?.owner?._id}`)
    // console.log(response)
    if(response?.data?.data?.acknowledged) {
      setSubscribe(false);
      fetchVideoUser(video?.owner?._id)
    } else {
      setSubscribe(true);
      fetchVideoUser(video?.owner?._id)
    }
  }
  return (
    <div className="flex justify-center flex-row h-auto bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row h-auto">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-500px)] px-4 py-3lg:pyoverflow-y-auto pl-12">
          {/* video player */}
          <div className="h-[200px] md:h-[400px] lg:h-[400px]  ml-[-16px] lg:ml-0 mr-[-16plg:mr-0">
            <ReactPlayer
                url={video?.videoFile}
                controls
                width="100%"
                height="100%"
                style={{backgroundColor: "#000000"}}
                playing={true}
            />
          </div>
          {/* video details */}
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex space-x-2">
              <Link to={``} className='flex'>
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img 
                    className='h-full w-full object-cover'
                    src={video?.owner?.avatar}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.owner?.fullName}
                  {true && (
                      <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                    )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {videoOwner?.subscriber}
                </div>
              </div>
              </Link>
              <div className={`flex items-center justify-center h-10 px-5 rounded-3xl ${subscribe ? "bg-white/[0.15]" : "bg-white"} `}>
                { !subscribe ?
                  <button onClick={handleToggleSubscribe} className="transition-colors duration-300 ease-in-out">
                      Subscribe
                  </button> :
                  <button onClick={handleToggleSubscribe} className="flex items-center space-x-1 transition-colors duration-300 ease-in-out text-white">
                      <FaRegBell />
                      <span>Subscribed</span>
                  </button>
                }
              </div>
              <div className={`flex items-center justify-center h-10 px-5 rounded-3xl bg-white/[0.15]`}>
                  <Link to={`/app/playlist-add/${id}`} className="flex items-center space-x-1 transition-colors duration-300 ease-in-out text-white">
                      <MdOutlineSaveAlt />
                      <span>Save</span>
                  </Link>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
              <button onClick={handleToggleLike} className="transition-colors duration-300 ease-in-out">
                  {liked ? 
                    <AiFillLike className="text-xl text-white mr-2" /> : 
                    <AiOutlineLike className="text-xl text-white mr-2" />
                  }
              </button>
                
                {`${abbreviateNumber(
                  like,
                  2
                )} Likes`}
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/ml-4">
                {`${abbreviateNumber(
                  video?.views,
                  2
                )} Views`}
              </div>
            </div>
          </div>
          <div className='border-white border-t mt-3'>
          </div>
          
          {/* comment section starts */}
          {video?._id && <Comment video={video}/> }
        </div>
        {/* related video */}
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.map((item, index) => {
            if (!item) return false;
            return (
              <SuggestionVideoCard
                key={index}
                video={item}
              />
            );
          })}
        </div>
      </div>
      
    </div>
  )
}

export default VideoDetails