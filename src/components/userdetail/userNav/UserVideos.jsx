import React,{useState, useEffect} from 'react'
import { fetchDataFromApi } from '../../utils/api'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../../features/hooks/hookSlice'
import VideoCard from '../../Home/VideoCard'
import { useParams } from 'react-router-dom'

const UserVideos = () => {

  const dispatch = useDispatch()
  const [videos, setVideos] = useState(null)
  const {id} = useParams()

  useEffect(()=>{
    fetchUserVideo();
  }, [id])

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

  return (
    <div>
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
  )
}

export default UserVideos