import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TimeAgo from '../../shared/TimeAgo'
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineLike } from 'react-icons/ai'
import { fetchDataFromApi } from '../../utils/api';
import axios from 'axios';

const UserPost = ({post}) => {
    const user = useSelector(state => state.userReducer.user)
    const [postLikes, setPostLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(()=>{
        fetchTweetLikes(post?._id)
    }, [post])

    const fetchTweetLikes = async(id) => {
        const result = await fetchDataFromApi(`likes/tweet/${id}`)
        // console.log(`result`,result?.[0])
        if(result?.[0]?.totalLikes) {
            setPostLikes(result?.[0]?.totalLikes)
            setIsLiked(result?.[0]?.isLiked)
        } else {
          setPostLikes(0);
          setIsLiked(false);
        }
    }

    const togglePostLike = async() => {
        const result = await axios.post(`https://youtube-backend-rw43.onrender.com/api/v1/likes/toggle/t/${post?._id}`)
        console.log(result.data.data)
        if(result?.data?.data?.acknowledged) {
          setPostLikes(postLikes-1)
          setIsLiked(false)
        } else {
          setPostLikes(postLikes+1)
          setIsLiked(true)
        }
    }
  return (
    <>
        <div className="bg-card m-4 rounded-2xl shadow-md border-2 border-solid border-zinc-700">
                <div className='p-4'>
                    <div className="flex items-center mb-2">
                        <img src={user?.avatar} alt="User Avatar" className="rounded-full mr-2 h-10 w-10 object-cover" />
                        <div className='space-x-3'>
                          <span className="font-semibold text-white">{user?.name}</span>
                          <span className="text-muted-foreground text-sm text-zinc-400">
                            <TimeAgo timestamp={post?.createdAt}/>
                          </span>
                        </div>
                    </div>
                    <p className="text-foreground mb-2 text-white">
                        {post?.content}
                    </p>
                    <div className="flex items-center">
                      <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mr-2 text-white flex items-center">
                          <button onClick={togglePostLike} className='p-[7px] rounded-full hover:bg-zinc-600'>
                            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
                          </button>
                          <span>{postLikes}</span> 
                      </div>
                      <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 text-white flex items-center">
                          <button className='p-[7px] rounded-full hover:bg-zinc-600'><BiCommentDetail /></button>
                          <span>0</span>
                      </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default UserPost