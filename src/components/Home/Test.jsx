import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import LeftNav from '../LeftNav/LeftNav'
import { useSelector, useDispatch } from 'react-redux'
import VideoCard from './VideoCard'
import { toggleLoading } from '../../features/hooks/hookSlice'
import {fetchDataFromApi} from "../utils/api"

const Test = () => {

  const dispatch = useDispatch()
  const loading = useSelector(state => state.hookReducer.loading)
  const [videos, setVideos] = useState(null)
  const [user, setUser] = useState({})

  useEffect(()=>{
    fetchUserVideo();
  }, [])

  useEffect(()=>{
    if(videos?.owner?._id) {
      fetchUser(videos?.owner?._id)
    }
  }, [videos])

  const fetchUser = async (owner) => {
    console.log(owner)
    const result = await fetchDataFromApi(`subscriptions/u/${owner}`)
    console.log("video owner",result?.[0])
    setUser(result?.[0])
  }

  const fetchUserVideo = async () => {
    dispatch(toggleLoading())
    const options = {
      params: {
        page: 1,
        limit: 10,
      },
    }

    try {
      const response = await fetchDataFromApi(`/videos`,options)
      console.log(response);
      setVideos(response?.videos);
      dispatch(toggleLoading())
    } catch (error) {
      dispatch(toggleLoading())
      console.log(error)
    }
  }

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  },[])

  return (
    <div>
        <Header />
        <div className='flex flex-row h-[calc(100%-56px)] bg-black'>
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-screen overflow-y-auto bg-black">
                <div className="bg-background text-foreground p-4">
                    <div class="relative mb-2">
                    <img class="w-full h-40 object-cover rounded-lg" src="https://placehold.co/1200x400.png?text=Cover+Image" alt="Cover Image" />
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="bg-yellow-400 p-2 rounded-md text-black font-bold">Starting August 2024</div>
                    </div>
                    </div>
                    <div className="flex">
                        <div className="flex lg:h-[200px] lg:w-[200px] sm:h-[100px] sm:w-[100px] 
                        h-[100px] w-[100px] overflow-hidden rounded-full md:ml-4">
                            <img className="object-cover w-full h-full" src='http://res.cloudinary.com/priyanshu7/image/upload/v1720862753/zl04rns9qldmgod53acf.jpg' alt="Profile Image" />
                        </div>
                        <div className="ml-4 pt-7 flex flex-col gap-1">
                          <h1 className="text-4xl font-bold text-white">priyanshu modi</h1>

                          <p className="text-zinc-400">@priyanshusuryawanshi3302 . 3 subscribers . 9 videos</p>
                          <p className="text-zinc-400">Instagram - suryavanshi212 <span className='text-white'>...more</span></p>

                          <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <button className="bg-white/[0.15] text-white hover:bg-white/[0.20] px-4 py-2 rounded-3xl font-medium">Customise channel</button>
                            <button className="bg-white/[0.15] text-white hover:bg-white/[0.20] px-4 py-2 rounded-3xl ml-2 font-medium">Manage videos</button>
                          </div>
                        </div>                
                    </div>
                    <nav className="mt-6">
                        <ul className="flex space-x-4">
                            <li>
                                <a href="#" className="text-zinc-300 font-semibold text-lg hover:bg-white/[0.15] hover:text-white bg-white/[0.15] px-4 py-1 rounded-lg">
                                  Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-zinc-300 font-semibold text-lg hover:bg-white/[0.15] hover:text-white px-4 py-1 rounded-lg">
                                  Videos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-zinc-300 font-semibold text-lg hover:bg-white/[0.15] hover:text-white px-4 py-1 rounded-lg">
                                  Shorts
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-zinc-300 font-semibold text-lg hover:bg-white/[0.15] hover:text-white px-4 py-1 rounded-lg">
                                  Playlists
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-zinc-300 font-semibold text-lg hover:bg-white/[0.15] hover:text-white px-4 py-1 rounded-lg">
                                  Community
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className='border-white border-t mt-3'>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                          {videos &&
                          videos.map((item) => {
                              if (!item) return false;
                              return (
                                  <VideoCard
                                      key={item?._id}
                                      video={item}
                                  />
                              );
                    })}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Test