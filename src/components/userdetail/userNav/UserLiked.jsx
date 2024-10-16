import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../utils/api'
import { toggleLoading } from '../../../features/hooks/hookSlice'
import { useDispatch } from 'react-redux'
import VideoCard from '../../Home/VideoCard'
import PlaylistCard from './PlaylistCard'

const UserLiked = () => {
  const dispatch = useDispatch()
  const [likedVideos, setLikedVideos] = useState([])

  useEffect(() => {
    fetchLikedVideos()
  }, [])

  const fetchLikedVideos = async() => {
    dispatch(toggleLoading())
    const result = await fetchDataFromApi('likes/videos')
    console.log(result)
    setLikedVideos(result)
    dispatch(toggleLoading())
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {likedVideos &&
          likedVideos.map((item) => {
              if (!item) return false;
              return (
                  <VideoCard
                      key={item?._id}
                      video={item?.video}
                  />
              );
          })}
      </div>
    </>
  )
}

export default UserLiked