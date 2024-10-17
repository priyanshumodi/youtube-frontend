import React, { useEffect, useState } from 'react'
import LeftNav from '../LeftNav/LeftNav'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../features/hooks/hookSlice'
import {fetchDataFromApi} from "../utils/api"
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { CiCamera } from "react-icons/ci";
import axios from 'axios'
import { removeUser } from '../../features/auth/userSlice'

const UserDetail = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    fetchUser(id)
  }, [id])

  const fetchUser = async (id) => {
    dispatch(toggleLoading())
    // console.log(id)
    const result = await fetchDataFromApi(`subscriptions/u/${id}`)
    // console.log("user",result?.[0])
    setUser(result?.[0])
    dispatch(toggleLoading())
  }

  const handleLogOut = async (event) => {
    event.preventDefault();
    dispatch(toggleLoading());
    try {
      const response = await axios.post(`/api/v1/users/logout`);
      console.log('logout', response)
      dispatch(removeUser())
      navigate('/user/login')
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(toggleLoading());
    }

  }

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  },[])

  return (
    <div>
        <div className='flex flex-row h-[calc(100%-56px)] bg-black'>
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-[700px] overflow-y-auto bg-black">
                <div className="bg-background text-foreground p-4">
                    {user?.coverImage && 
                    <Link 
                    to={'/app/coverImage'}
                    className="relative mb-2">
                    <img className="w-full h-40 object-cover rounded-lg" src={user?.coverImage} alt="Cover Image" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <div className="text-black font-bold text-2xl"><CiCamera /></div>
                    </div>
                    </Link>
                    }
                    <div className="flex">
                        <Link 
                        to={'/app/avatar'}
                        className="flex lg:h-[200px] lg:w-[200px] sm:h-[100px] sm:w-[100px] 
                        h-[100px] w-[100px] overflow-hidden rounded-full md:ml-4 relative mt-5">
                            <img className="object-cover w-full h-full transition-filter duration-300 hover:filter hover:blur-sm hover:saturate-100 hover:brightness-90" src={user?.avatar} alt="Profile Image" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                <div className="text-black font-bold text-2xl"><CiCamera /></div>
                            </div>
                        </Link>
                        <div className="ml-4 pt-7 flex flex-col gap-1">
                          <h1 className="text-4xl font-bold text-white">{user?.fullName}</h1>

                          <p className="text-zinc-400">@{user?.username} . {user?.subscriber} subscribers . 3 videos</p>

                          <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <Link to={'/app/customize'} className="bg-white/[0.15] text-white hover:bg-white/[0.20] px-4 py-2 rounded-3xl font-medium">Customise channel</Link>
                            <Link to={'/app/password'} className="bg-white/[0.15] text-white hover:bg-white/[0.20] px-4 py-2 rounded-3xl ml-2 font-medium">change password</Link>
                            <button onClick={handleLogOut} className="bg-white/[0.15] text-white hover:bg-white/[0.20] px-4 py-2 rounded-3xl ml-2 font-medium">LogOut</button>
                          </div>
                        </div>                
                    </div>
                    
                    <nav className="mt-6">
                        <ul className="flex space-x-4">
                            <li>
                                <NavLink
                                to={'home'}
                                className={({isActive}) => `${isActive ? 'bg-white/[0.15] text-white': 'text-zinc-300'} font-semibold text-lg hover:bg-white/[0.15] hover:text-white  px-4 py-1 rounded-lg`}
                                >
                                  Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to={'videos'}
                                className={({isActive}) => `${isActive ? 'bg-white/[0.15] text-white': 'text-zinc-300'} font-semibold text-lg hover:bg-white/[0.15] hover:text-white  px-4 py-1 rounded-lg`}
                                >
                                  Videos
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to={'liked'}
                                className={({isActive}) => `${isActive ? 'bg-white/[0.15] text-white': 'text-zinc-300'} font-semibold text-lg hover:bg-white/[0.15] hover:text-white  px-4 py-1 rounded-lg`}
                                >
                                  Liked
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to={'playlist'}
                                className={({isActive}) => `${isActive ? 'bg-white/[0.15] text-white': 'text-zinc-300'} font-semibold text-lg hover:bg-white/[0.15] hover:text-white  px-4 py-1 rounded-lg`}
                                >
                                  Playlist
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to={'community'}
                                className={({isActive}) => `${isActive ? 'bg-white/[0.15] text-white': 'text-zinc-300'} font-semibold text-lg hover:bg-white/[0.15] hover:text-white  px-4 py-1 rounded-lg`}
                                >
                                  Community
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className='border-white border-t mt-3'>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserDetail