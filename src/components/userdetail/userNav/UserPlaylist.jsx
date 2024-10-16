import React, { useEffect, useState } from 'react'
import PlaylistCard from './PlaylistCard'
import { fetchDataFromApi } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLoading } from '../../../features/hooks/hookSlice'

const UserPlaylist = () => {
  const [user, setUser] = useState(useSelector(state => state.userReducer.user));
  const dispatch = useDispatch()
  const [playlist, setPlaylist] = useState([])
  useEffect(() => {
    fetchUserPlaylist(user._id)
  }, [])

  const fetchUserPlaylist = async(id) => {
    dispatch(toggleLoading())
    const result = await fetchDataFromApi(`playlist/user/${id}`)
    console.log(result)
    setPlaylist(result)
    dispatch(toggleLoading())
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {playlist &&
          playlist.map((item) => {
              if (!item) return false;
              return (
                  <PlaylistCard
                      key={item?._id}
                      playlist={item}
                  />
              );
          })}
      </div>
    </>
  )
}

export default UserPlaylist