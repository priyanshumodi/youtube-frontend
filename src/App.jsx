import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Healthcheck from './components/Healthcheck'
import LandingPage from './components/LandingPage'

import PrivateRoutes from './components/utils/PrivateRoutes'
import axios  from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './features/auth/userSlice'
import UserDetail from './components/userdetail/UserDetail'
import Layout from './components/Layout/Layout'
import Feed from './components/Home/Feed'
import SearchResult from './components/SearchResult/SearchResult'
import VideoDetails from './components/Video/VideoDetails'
import Test from './components/Home/Test'
import UserLayout from './components/Layout/UserLayout'
import UserVideos from './components/userdetail/userNav/UserVideos'
import UserLiked from './components/userdetail/userNav/UserLiked'
import UserCommunity from './components/userdetail/userNav/UserCommunity'
import UploadVideo from './components/Video/UploadVideo'
import UserPlaylist from './components/userdetail/userNav/UserPlaylist'
import Playlist from './components/playlist/Playlist'
import UpdateAvatar from './components/userdetail/UpdateAvatar'
import UpdateCoverImage from './components/userdetail/UpdateCoverImage'
import UpdateUser from './components/userdetail/UpdateUser'
import ChangePassword from './components/userdetail/ChangePassword'
import UpdatePlaylist from './components/playlist/UpdatePlaylist'
import AddVideo from './components/playlist/AddVideo'
import CreatePlaylist from './components/playlist/CreatePlaylist'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchUserData()
  },[])

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/v1/users/current-user');
      const result = response.data
      console.log('api response',result)
      dispatch(addUser(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/user/login' element={<Login />}/>
            <Route path='/user/signup' element={<Signup />}/>
            <Route path='/healthcheck' element={<Healthcheck />} />
            <Route path='/' element={<LandingPage/>} />
            

            <Route path='/app' element={<PrivateRoutes><Layout /></PrivateRoutes>}>
                <Route index exact element={<PrivateRoutes><Feed /></PrivateRoutes>} />
                <Route path='searchResult/:searchQuery' element={<PrivateRoutes><SearchResult /></PrivateRoutes>}/>
                <Route path='video/:id' element={<PrivateRoutes><VideoDetails /></PrivateRoutes>} />
                <Route path='video/upload' element={<PrivateRoutes><UploadVideo /></PrivateRoutes>} />
                <Route path='user/:id' element={<PrivateRoutes><UserLayout/></PrivateRoutes>}>
                    <Route path='home' index element={<PrivateRoutes></PrivateRoutes>} />
                    <Route path='videos' element={<PrivateRoutes><UserVideos/></PrivateRoutes>} />
                    <Route path='liked' element={<PrivateRoutes><UserLiked /></PrivateRoutes>} />
                    <Route path='playlist' element={<PrivateRoutes><UserPlaylist /></PrivateRoutes>} />
                    <Route path='community' element={<PrivateRoutes><UserCommunity /></PrivateRoutes>} />
                </Route>
                <Route path='playlist/:id' element={<PrivateRoutes><Playlist /></PrivateRoutes>}/>
                <Route path='avatar' element={<PrivateRoutes><UpdateAvatar /></PrivateRoutes>} />
                <Route path='coverImage' element={<PrivateRoutes><UpdateCoverImage /></PrivateRoutes>} />
                <Route path='customize' element={<PrivateRoutes><UpdateUser /></PrivateRoutes>} />
                <Route path='password' element={<PrivateRoutes><ChangePassword /></PrivateRoutes>} />
                <Route path='playlist-update/:id' element={<PrivateRoutes><UpdatePlaylist /></PrivateRoutes>} />
                <Route path='playlist-add/:videoId' element={<PrivateRoutes><AddVideo /></PrivateRoutes>} />
                <Route path='playlist-create' element={<PrivateRoutes><CreatePlaylist /></PrivateRoutes>} />
            </Route>

            <Route path='/test' element={<Test />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
